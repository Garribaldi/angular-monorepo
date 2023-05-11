import { Injectable } from '@angular/core';
import moment from "moment";
import { assertCannotReach, isDate, isRegExp, isString } from "@local/shared/utils";
import { isFilterDate } from "./data-grid.utils";
import { FilterType } from "./models/filter-type.model";
import { Filter } from "./models/filter.model";
import { CheckFilter } from "./models/check-filter.model";
import { FilterDate } from "./models/filter-date.model";
import { FilterConstraints } from "./models/filter-constraints.model";
import { GroupedFilter } from "./models/grouped-filter.model";
import { FilterValueCount } from "./models/filter-value-count.model";
import { Datasource } from "./models/datasource.model";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService<T extends Datasource<T>> {

  private _dataSource: T[] = [];
  /**
   * Store filter datsasource for current page
   * @param data array ob objects
   */
  set dataSource(data: T[]) {
    this._dataSource = data;
    this.reset();
  }

  private _filteredData: T[] = [];
  get filteredData(): T[] {
    return this._filteredData;
  }

  /**
   * Iterate a provided filter list and search for matching data in datasource.
   *
   * If filter list is empty, the filtered list is reset to default (equals datasource).
   *
   * @param groupedFilter array of selected filter
   */
  filter(groupedFilter: GroupedFilter) {
    let filtered: T[] = this._dataSource;

    groupedFilter.forEach((columnFilters, column) => {
      if (!columnFilters.length) {
        return;
      }

      const filterType = columnFilters[0]?.type;

      let pattern = '';
      let constraint: FilterConstraints;

      switch (filterType) {
        case FilterType.CHECK_FILTER:
          pattern = columnFilters.map(filter => filter.value?.toString() ?? '').join('|');
          constraint = new RegExp(`(${pattern})`, 'ig');
          break;

        case FilterType.DATE_FILTER:
          constraint = columnFilters.map(filter => filter.value as FilterDate).reduce((acc, curr) => curr);
          break;

        default:
          assertCannotReach(filterType)
      }

      filtered = filtered.filter(data => {
        const columnValue = data[column as keyof T];
        let found = false;

        if (isRegExp(constraint) && isString(columnValue)) {
          found = this.filterByCheck(columnValue, constraint);
        }

        if (isFilterDate(constraint) && isDate(columnValue)) {
          found = this.filterByDate(columnValue, constraint);
        }

        return found;
      });
    });

    this._filteredData = filtered;
  }

  /**
   * Reduce datasource to unique values per column and return a __Filter__ array with each unique value.
   * @param column object column to take values from
   * @param label column display value (for chips list)
   */
  getCheckFilters(column: string, label?: string): Filter[] {
    return this._dataSource
      .reduce((acc, curr) => {
        const exists = acc.find(data => data.value === curr[column as keyof T]);

        if (exists) {
          exists.hitCount += 1;
        } else {
          acc.push({value: curr[column as keyof T], hitCount: 1});
        }

        return acc;
      }, [] as Array<FilterValueCount>)
      .map(({value, hitCount}): Filter =>
        new CheckFilter({value: value.toString(), column, label, displayValue: value.toString(), hitCount}
        )
      );
  }

  private filterByCheck(columnValue: string, constraint: RegExp): boolean {
    return !!columnValue.match(constraint) ?? false;
  }

  private filterByDate(columnValue: Date, dateRange: FilterDate): boolean {
    return moment(columnValue).isBetween(dateRange.from, dateRange.to, 'days', '[]');
  }

  private reset() {
    this._filteredData = [...this._dataSource];
  }
}
