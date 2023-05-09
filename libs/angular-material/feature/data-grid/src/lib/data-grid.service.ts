import { Injectable } from '@angular/core';
import { Filter, FilterCount, FilterDate, FilterType, GroupedFilter } from "./data-grid.model";
import { v4 as uuidv4 } from 'uuid';
import * as moment from "moment";
import { assertCannotReach } from "@local/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class DataGridService<T extends Record<string, any>> {

  private _filteredData: T[] = [];
  get filteredData(): T[] {
    return this._filteredData;
  }

  private _dataSource: T[] = [];
  /**
   * Store filter datsasource for current page
   * @param data array ob objects
   */
  set dataSource(data: T[]) {
    this._dataSource = data;
    this.reset();
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

    const foundData: T[] = [];

    const groupedFilter = this.getGroupedFilter(filters);
    let constraint = '';

    let filtered: T[] = this._dataSource;

    Object.keys(groupedFilter).forEach(column => {
      const columnFilter = groupedFilter[column];
      constraint = columnFilter.map(filter => filter.value.toString()).join('|');

      console.log(new RegExp(constraint));

      filtered = filtered.filter(data => {
        const dataColumn = data[column];

        return !!dataColumn.match(new RegExp('(' + constraint + ')', 'ig')) ?? false;

        // if (typeof dataColumn === "string") {
        //  console.log(dataColumn.match(new RegExp('(' + constraint + ')', 'ig')));
        // }
      });
    });

    console.log(filtered);



    filters.forEach(filter => {
      const newValue = this._dataSource.filter(data => {
        const dataColumn: T = data[filter.column];
        let matches = false;

        switch (filter.type) {
          case FilterType.CHECK_FILTER:
            matches = this.filterByCheck(dataColumn, filter);
            break;
          case FilterType.DATE_FILTER:
            matches = this.filterByDate(dataColumn, filter);
            break;
          default:
            assertCannotReach(filter.type);
        }

        const isDuplicate = foundData.find(data => data[filter.column] === dataColumn);

        return matches && !isDuplicate;
      });

      foundData.push(...newValue);
    });

    this._filteredData = foundData;
  }

  private filterByCheck(dataColumn: T, filter: Filter): boolean {
    return !!dataColumn && dataColumn === filter.value
  }

  private filterByDate(dataColumn: T, filter: Filter): boolean {
    const dateRange = filter.value as FilterDate;
    return moment(dataColumn).isBetween(dateRange.from, dateRange.to, 'days', '[]');
  }

  private reset() {
    this._filteredData = [...this._dataSource];
  }

  private getDateFilter(column: string, label?: string): Filter {
    return {
      id: uuidv4(),
      type: FilterType.DATE_FILTER,
      value: {
        from: null,
        to: null
      },
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
      .map((data): Filter => ({
          id: uuidv4(),
          type: FilterType.CHECK_FILTER,
          value: data.value,
          column,
          displayValue: data.value.toString(),
          label: label ?? '',
          hitCount: data.hitCount
        })
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
