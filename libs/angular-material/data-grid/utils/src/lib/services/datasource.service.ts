import { Injectable } from '@angular/core';
import { ReplaySubject, shareReplay } from 'rxjs';
import { Datasource } from '../models/datasource.model';
import { GroupedFilter } from '../models/grouped-filter.model';
import { Filter } from '../models/filter/filter.model';
import { FilterValueHitCount } from '../models/filter-value-hit-count.model';
import { CheckFilter } from '../models/filter/check-filter.model';

@Injectable()
export class DatasourceService<T extends Datasource<T>> {

  private _dataSource: T[] = [];
  /**
   * Store filter datasource for current page.
   * Keep original array order by setting  _datasourceIndex_ property
   * @param datasource array of objects
   */
  set dataSource(datasource: T[]) {
    this._dataSource = datasource.map((data, index) => ({...data, _datasourceIndex: index}));
    this.resetFilteredData();
    this.dataSourceChanged.next();
  }

  private readonly dataSourceChanged = new ReplaySubject<void>(1);
  private readonly filteredData = new ReplaySubject<T[]>(1);

  readonly dataSourceChanged$ = this.dataSourceChanged.asObservable().pipe(shareReplay());
  readonly filteredData$ = this.filteredData.asObservable().pipe(shareReplay());

  /**
   * Iterate a provided filter list and search for matching data in datasource.
   *
   * If filter list is empty, the filtered list is reset to default (equals datasource).
   *
   * @param groupedFilter array of selected filter
   */
  applyFilter(groupedFilter: GroupedFilter) {
    let filteredData = this._dataSource;

    groupedFilter.forEach((columnFilter, column) => {
      if (!columnFilter.length) {
        return;
      }

      filteredData = columnFilter
        .map(filter => filteredData.filter(data => {
          const columnValue = data[column as keyof T];
          return filter.matches(columnValue);
        }))
        .reduce((accumulatedResults, filterResults) => {
          filterResults.forEach(filterResult => this.isDuplicate(accumulatedResults, filterResult) ? null : accumulatedResults.push(filterResult));
          return accumulatedResults;
        }, [])
        .sort((a, b) => <number>a._datasourceIndex - <number>b._datasourceIndex);
    });

    this.filteredData.next(filteredData);
  }

  /**
   * Reduce datasource to unique values per column and return a __Filter__ array with each unique value.
   * @param column object field to take values from
   * @param label column label (for chips list group)
   */
  getCheckFilterForColumn(column: string, label?: string): Filter[] {
    return this._dataSource
      .reduce((filterValueHitCounts, curr) => {
        const currentValue = curr[column as keyof T] ?? '';
        const exists = filterValueHitCounts.find((data) => data.value === currentValue);

        if (exists) {
          exists.hitCount += 1;
        } else {
          filterValueHitCounts.push({value: currentValue, hitCount: 1});
        }

        return filterValueHitCounts;
      }, [] as Array<FilterValueHitCount>)
      .map(({value, hitCount}): Filter => new CheckFilter({value: value.toString(), column, label, hitCount}))
      .sort((a, b) => <string>a.value > <string>b.value ? 1 : -1);
  }

  getMinValue(column: string) {
    return this._dataSource
      .reduce((acc, curr) => {
        const currentValue = curr[column as keyof T] as number;
        return currentValue < acc ? currentValue : acc;
      }, Infinity);
  }

  getMaxValue(column: string) {
    return this._dataSource
      .reduce((acc, curr) => {
        const currentValue = curr[column as keyof T] as number;
        return currentValue > acc ? currentValue : acc;
      }, -Infinity);
  }

  private resetFilteredData() {
    this.filteredData.next([...this._dataSource]);
  }

  private isDuplicate(accumulatedResults: T[], filterResult: T): boolean {
    return accumulatedResults.some(accumulatedResult => accumulatedResult._datasourceIndex === filterResult._datasourceIndex);
  }
}
