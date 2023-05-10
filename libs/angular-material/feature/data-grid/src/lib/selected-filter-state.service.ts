import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, share, shareReplay, Subject } from "rxjs";
import { Filter } from "./data-grid-filter.model";
import { isFilterArray } from "./data-grid.utils";


@Injectable({
  providedIn: 'root'
})
export class SelectedFilterStateService {

  private readonly selectedFilters = new BehaviorSubject<Filter[]>([]);
 private readonly resetAll = new Subject<void>();

  readonly selectedFilter$ = this.selectedFilters.asObservable().pipe(
    distinctUntilChanged((a,b) => JSON.stringify(a) === JSON.stringify(b)),
    shareReplay(1)
  );

  readonly resetAll$ = this.resetAll.asObservable().pipe(share());

  /**
   * Add a new filter at the end of the filter list.
   *
   * You can provide a single filter or a filter array.
   * @param filters single filter or array of filters
   */
  addFilter(filters: Filter[]): void
  addFilter(filters: Filter): void
  addFilter(filters: Filter[] | Filter): void {
    let newFilters = isFilterArray(filters) ? filters : [filters];
    newFilters = newFilters.filter(added => !this.selectedFilters.value.some(existing => existing.id === added.id));

    const updatedFilters = [...this.selectedFilters.value, ...newFilters];
    this.selectedFilters.next(updatedFilters);
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
    const updatedFilters = this.selectedFilters.value
      .filter(existingFilter => existingFilter.column !== column)
      .concat(newFilters.filter(newFilter => newFilter.column === column));

    this.selectedFilters.next(updatedFilters);
  }

  removeFilter(filter: Filter): void {
    const filters = this.selectedFilters.value.filter(existingFilter => existingFilter.id !== filter.id);
    this.selectedFilters.next(filters);
  }

  removeAllFilters(): void {
    this.selectedFilters.next([]);
    this.resetAll.next();
  }

  removeFiltersByColumn(column: string): void {
    const filters = this.selectedFilters.value.filter(existingFilter => existingFilter.column !== column);
    this.selectedFilters.next(filters);
  }
}
