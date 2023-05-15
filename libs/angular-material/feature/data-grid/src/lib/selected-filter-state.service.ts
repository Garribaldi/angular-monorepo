import { Injectable } from '@angular/core';
import { BehaviorSubject, share, shareReplay, Subject } from "rxjs";
import { Filter } from "./models/filter.model";
import { GroupedFilter } from "./models/grouped-filter.model";
import { isArray } from "chart.js/helpers";

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
   * @param filter single filter or array of filters
   */

  addFilter(filter: Filter): void {
    const column = filter.column;
    const columnFilters = this.filterList.get(column) ?? [];
    const updatedFilters = columnFilters.filter(existing => existing.id !== filter.id);
    updatedFilters.push(filter)

    this.filterList.set(column, updatedFilters);

    this.selectedFilters.next(this.filterList);
  }

  /**
   * Replace a filter value by its column.
   * Only provide the filter(s). The column is read via its property.
   *
   * @param filter single filter or array of filter objects
   * @param column name of filter column to update
   */
  updateFiltersByColumn(filter: Filter | Filter[], column: string): void {
    const newFilters = isArray(filter) ? filter : [filter];
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
