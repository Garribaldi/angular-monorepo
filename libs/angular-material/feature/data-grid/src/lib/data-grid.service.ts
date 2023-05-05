import { Injectable } from '@angular/core';
import { FilterValue } from "./data-grid.model";

@Injectable({
  providedIn: 'root'
})
export class DataGridService<T extends Record<string, any>> {

  private dataSource: T[] = [];

  setDataSource(data: T[]): void {
    this.dataSource = data;
  }

  getColumnData(column: string): FilterValue[] {
    return this.dataSource.map(data => data[column]);
  }
}
