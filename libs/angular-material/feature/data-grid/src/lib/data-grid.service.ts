import { Injectable } from '@angular/core';
import { Filter, FilterCount, FilterType } from "./data-grid.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataGridService<T extends Record<string, any>> {

  private dataSource: T[] = [];

  private _filteredData: T[] = [];

  get filteredData(): T[] {
    return this._filteredData;
  }

  /**
   * Store filter datsasource for current page
   * @param data array ob objects
   */
  setDataSource(data: T[]): void {
    this.dataSource = data;
    this.reset();
  }

  /**
   * Reduce datasource to unique values per column and return a __Filter__ array with each unique value.
   * @param column object column to take values from
   * @param type filter type to apply on column
   */
  getFiltersForColumn(column: string, type: FilterType): Filter[] {
    return this.dataSource
      .reduce((acc, curr) => {
        const exists = acc.find(data => data.value === curr[column]);

        if (exists) {
          exists.hitCount += 1;
        } else {
          acc.push({value: curr[column], hitCount: 1});
        }

        return acc;
      }, [] as Array<FilterCount>)
      .map(data => ({
          id: uuidv4(),
          type: type,
          value: data.value,
          column,
          displayValue: data.value.toString(),
          hitCount: data.hitCount,
          selected: false
        })
      );
  }

  filter(filters: Filter[]) {
    if (!filters.length) {
      this.reset();
      return;
    }

    const foundData: T[] = [];

    filters.forEach(filter => {
      const newValue = this.dataSource.filter(data => {
        const dataColumn = data[filter.column];
        const matches = dataColumn && dataColumn === filter.value;
        const isDuplicate = foundData.find(data => data[filter.column] === dataColumn);

        return matches && !isDuplicate;
      });

      foundData.push(...newValue);
    });

    this._filteredData = foundData;
  }

  private reset() {
    this._filteredData = [...this.dataSource];
  }
}
