import { Injectable } from '@angular/core';
import {
  Filter,
  FilterConstraints,
  FilterCount,
  FilterDate,
  FilterType,
  GroupedFilter
} from "./data-grid-filter.model";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { assertCannotReach, isRegExp } from "@local/shared/utils";
import { isFilterDate, isValidFilterDate, isValidFilterString } from "./data-grid.utils";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService<T extends Record<string, any>> {

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
   * Reduce datasource to unique values per column and return a __Filter__ array with each unique value.
   * @param column object column to take values from
   * @param type filter type to apply on column
   * @param label column display value (for chips list)
   */
  getFiltersForColumn(column: string, type: FilterType, label?: string): Filter[] {

    let filters: Filter[] = [];

    switch (type) {
      case FilterType.CHECK_FILTER:
        filters = this.getCheckFilters(column, label);
        break;
      case FilterType.DATE_FILTER:
        filters = [this.getDateFilter(column, label)];
        break;
      default:
        assertCannotReach(type);
    }

    return filters;
  }

  /**
   * Iterate a provided filter list and search for matching data in datasource.
   *
   * If filter list is empty, the filtered list is reset to default (equals datasource).
   *
   * @param filters array of selected filter
   */
  filter(filters: Filter[]) {

    if (!filters.length) {
      this.reset();
      return;
    }

    let filtered: T[] = this._dataSource;

    const groupedFilter = this.getGroupedFilter(filters);
    const filterColumns = Object.keys(groupedFilter);

    filterColumns.forEach(column => {
      const columnFilters = groupedFilter[column];
      const filterType = columnFilters[0].type;

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
        const columnValue = data[column];
        let found = false;

        if (isRegExp(constraint)) {
          found = this.filterByCheck(columnValue, constraint);
        }

        if (isFilterDate(constraint)) {
          found = this.filterByDate(columnValue, constraint);
        }

        return found;
      });
    });

    this._filteredData = filtered;
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

  private getDateFilter(column: string, label?: string): Filter {
    const filterDate: FilterDate = {
      from: null,
      to: null
    };

    return {
      id: uuidv4(),
      type: FilterType.DATE_FILTER,
      value: isValidFilterDate(filterDate) ? filterDate : null,
      column,
      displayValue: '',
      label: label ?? '',
      hitCount: this._dataSource.length,
    }
  }

  private getCheckFilters(column: string, label?: string): Filter[] {
    return this._dataSource
      .reduce((acc, curr) => {
        const exists = acc.find(data => data.value === curr[column]);

        if (exists) {
          exists.hitCount += 1;
        } else {
          acc.push({value: curr[column], hitCount: 1});
        }

        return acc;
      }, [] as Array<FilterCount>)
      .map((data): Filter => {
          const filterValue = isValidFilterString(data.value) ? data.value : null;
          return (
            {
              id: uuidv4(),
              type: FilterType.CHECK_FILTER,
              value: filterValue,
              column,
              displayValue: filterValue ?? '',
              label: label ?? '',
              hitCount: data.hitCount
            })
        }
      );
  }

  private getGroupedFilter(filters: Filter[]): GroupedFilter {
    const grouped: GroupedFilter = {};

    filters.forEach(filter => {
      if (!grouped[filter.column]) {
        grouped[filter.column] = [];
      }

      grouped[filter.column].push(filter);
    });

    return grouped;
  }
}
