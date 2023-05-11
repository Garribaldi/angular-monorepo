import { Injectable } from '@angular/core';
import { BehaviorSubject, share, shareReplay, Subject } from "rxjs";
import { Filter, GroupedFilter } from "./data-grid-filter.model";
import { isFilterArray } from "./data-grid.utils";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterStateService {

  private readonly selectedFilters = new BehaviorSubject<GroupedFilter>(new Map<string, Filter[]>());
  private readonly resetAll = new Subject<void>();

  readonly selectedFilter$ = this.selectedFilters.asObservable().pipe(shareReplay(1));
  readonly resetAll$ = this.resetAll.asObservable().pipe(share());

  private get filterList(): GroupedFilter {
    return this.selectedFilters.value;
  }

  /**
   * Add a new filter at the end of the filter list.
   *
   * You can provide a single filter or a filter array.
   * @param filters single filter or array of filters
   */
  addFilter(filters: Filter[]): void
  addFilter(filters: Filter): void
  addFilter(filters: Filter[] | Filter): void {
    let addedFilters = isFilterArray(filters) ? filters : [filters];

    const column = addedFilters[0]?.column ?? '';
    const columnFilters = this.filterList.get(column) ?? [];

    addedFilters = addedFilters.filter(added => !columnFilters.some(existing => existing.id === added.id));
    this.filterList.set(column, [...columnFilters, ...addedFilters]);

    this.selectedFilters.next(this.filterList);
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

    this.filterList.set(column, newFilters);

    this.selectedFilters.next(this.filterList);
  }

  removeFilter(filter: Filter): void {
    const column = filter.column;
    const columnFilters = this.filterList.get(column) ?? [];
    const updatedColumnFilters = columnFilters.filter(existingFilter => existingFilter.id !== filter.id);

    if (updatedColumnFilters.length) {
      this.filterList.set(column, updatedColumnFilters)
    } else {
      this.filterList.delete(column);
    }

    this.selectedFilters.next(this.filterList);
  }

  removeAllFilters(): void {
    this.filterList.clear();
    this.selectedFilters.next(this.filterList);
    this.resetAll.next();
  }

  removeFiltersByColumn(column: string): void {
    this.filterList.delete(column);

    this.selectedFilters.next(this.filterList);
  }
}
