import { Injectable } from '@angular/core';
import moment from "moment";
import { assertCannotReach, isDate } from "@local/shared/utils";
import { FilterType } from "./models/filter-type.model";
import { Filter } from "./models/filter.model";
import { CheckFilter } from "./models/check-filter.model";
import { FilterDate } from "./models/filter-date.model";
import { GroupedFilter } from "./models/grouped-filter.model";
import { FilterValueHitCount } from "./models/filter-value-count.model";
import { Datasource } from "./models/datasource.model";
import { ReplaySubject, shareReplay } from "rxjs";

@Injectable()
export class DataSourceService<T extends Datasource<T>> {

  private _dataSource: T[] = [];
  /**
   * Store filter datsasource for current page
   * @param data array of objects
   */
  set dataSource(data: T[]) {
    this._dataSource = data;
    this.reset();
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
  filter(groupedFilter: GroupedFilter) {
    let filtered = this._dataSource;

    groupedFilter.forEach((columnFilter, column) => {
      if (!columnFilter.length) {
        return;
      }

      let pattern = '';
      let regExp: RegExp;
      let filterDate: FilterDate;

      const filterType = columnFilter[0].type;

      switch (filterType) {
        case FilterType.CHECK_FILTER:
          pattern = columnFilter.map(filter => filter.value?.toString() ?? '').join('|');
          regExp = new RegExp(`(${pattern})`, 'ig');
          break;

        case FilterType.DATE_FILTER:
          filterDate = columnFilter.map(filter => filter.value as FilterDate).reduce((acc, curr) => curr);
          break;

        default:
          assertCannotReach(filterType)
      }

      filtered = filtered.filter(data => {
        const columnValue = data[column as keyof T];
        let found = false;

        if (regExp) {
          found = this.filterByCheck(columnValue.toString(), regExp);
        }

        if (filterDate && isDate(columnValue)) {
          found = this.filterByDate(columnValue, filterDate);
        }

        return found;
      });
    });

    this.filteredData.next(filtered);
  }

  /**
   * Reduce datasource to unique values per column and return a __Filter__ array with each unique value.
   * @param column object column to take values from
   * @param label column display value (for chips list)
   */
  getCheckFilter(column: string, label?: string): Filter[] {
    return this._dataSource
      .reduce((acc, curr) => {
        const currentValue = curr[column as keyof T];
        const exists = acc.find(data => data.value === currentValue);

        if (exists) {
          exists.hitCount += 1;
        } else {
          acc.push({value: currentValue, hitCount: 1});
        }

        return acc;
      }, [] as Array<FilterValueHitCount>)
      .map(({value, hitCount}): Filter => new CheckFilter({value: value.toString(), column, label, hitCount}));
  }

  private filterByCheck(columnValue: string, matcher: RegExp): boolean {
    return !!columnValue.match(matcher) ?? false;
  }

  private filterByDate(columnValue: Date, dateRange: FilterDate): boolean {
    const {from, to} = dateRange

    if (from && to) {
      return moment(columnValue).isBetween(from, to, 'days', '[]');
    }

    if (!from && to) {
      return moment(columnValue).isSameOrBefore(to, 'days');
    }

    if (from && !to) {
      return moment(columnValue).isSameOrAfter(from, 'days');
    }

    return false;
  }

  private reset() {
    this.filteredData.next([...this._dataSource]);
  }
}
