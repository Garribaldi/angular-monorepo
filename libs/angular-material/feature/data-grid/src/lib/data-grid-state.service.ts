import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, shareReplay } from "rxjs";
import { Filter } from "./data-grid.model";

@Injectable({
  providedIn: 'root'
})
export class DataGridStateService {

  private readonly _selectedFilters = new BehaviorSubject<Filter[]>([]);

  readonly selectedFilter$ = this._selectedFilters.asObservable().pipe(
    distinctUntilChanged((a,b) => JSON.stringify(a) === JSON.stringify(b)),
    shareReplay(1)
  );

  addFilter(filters: Filter[] | Filter): void {
    let newFilters = Array.isArray(filters) ? filters : [filters];
    newFilters = newFilters.filter(added => !this._selectedFilters.value.some(existing => existing.id === added.id));

    const updatedFilters = [...this._selectedFilters.value, ...newFilters];
    this._selectedFilters.next(updatedFilters);
  }

  /**
   * Replace a filter value by its type.
   *
   * The filter of the provided type is removed from selected filters.
   * Then the provided filter is added.
   *
   * @param filterType type from **FilterType** enum
   * @param filter array of filter objects
   */
  unpdateFiltersByColumn(filter: Filter[]): void
  unpdateFiltersByColumn(filter: Filter): void
  unpdateFiltersByColumn(filter: Filter | Filter[]): void {
    const newFilters: Filter[] = Array.isArray(filter) ? filter : [filter];
    const column = newFilters[0].column;
    const updatedFilters = this._selectedFilters.value
      .filter(existingFilter => existingFilter.column !== column)
      .concat(newFilters.filter(newFilter => newFilter.column === column));

    this._selectedFilters.next(updatedFilters);
  }

  removeFilter(filter: Filter): void {
    const filters = this._selectedFilters.value.filter(existingFilter => existingFilter.id !== filter.id);
    this._selectedFilters.next(filters);
  }

  removeAllFilters(): void {
    this._selectedFilters.next([]);
  }

  removeFiltersByColumn(column: string): void {
    const filters = this._selectedFilters.value.filter(existingFilter => existingFilter.column !== column);
    this._selectedFilters.next(filters);
  }
}
