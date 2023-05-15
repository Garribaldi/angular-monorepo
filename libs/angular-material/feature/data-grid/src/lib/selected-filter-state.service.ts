import { Injectable } from '@angular/core';
import { BehaviorSubject, share, shareReplay, Subject } from "rxjs";
import { Filter } from "./models/filter.model";
import { GroupedFilter } from "./models/grouped-filter.model";
import { isArray } from "chart.js/helpers";

@Injectable({
  providedIn: 'root'
})
export class SelectedFilterStateService {

  private readonly selectedFilter = new BehaviorSubject<GroupedFilter>(new Map<string, Filter[]>());
  private readonly removedFilter = new Subject<Filter[]>();
  private readonly resetAll = new Subject<void>();

  readonly selectedFilter$ = this.selectedFilter.asObservable().pipe(shareReplay(1));
  readonly removedFilter$ = this.removedFilter.asObservable().pipe(share());
  readonly resetAll$ = this.resetAll.asObservable().pipe(share());

  private get filterList(): GroupedFilter {
    return this.selectedFilter.value;
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

    this.selectedFilter.next(this.filterList);
  }

  /**
   * Replace a filter value by its column.
   * Only provide the filter(s). The column is read via its property.
   *
   * @param filter single filter or array of filter objects
   * @param column name of filter column to update
   */
  updateFilterByColumn(filter: Filter | Filter[], column: string): void {
    const newFilter = isArray(filter) ? filter : [filter];
    this.filterList.set(column, newFilter);

    this.selectedFilter.next(this.filterList);
  }

  removeFilter(filter: Filter): void {
    const column = filter.column;
    const columnFilter = this.filterList.get(column) ?? [];
    const updatedColumnFilter = columnFilter.filter(existingFilter => existingFilter.id !== filter.id);

    if (updatedColumnFilter.length) {
      this.filterList.set(column, updatedColumnFilter)
    } else {
      this.filterList.delete(column);
    }

    this.selectedFilter.next(this.filterList);
    this.removedFilter.next([filter]);

  }

  removeAllFilters(): void {
    const removedFilter = Array.from(this.filterList.values()).reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    })

    this.filterList.clear();

    this.selectedFilter.next(this.filterList);
    this.resetAll.next();
    this.removedFilter.next(removedFilter);
  }

  removeFiltersByColumn(column: string): void {
    const removedFilter = this.filterList.get(column) ?? [];

    this.filterList.delete(column);

    this.selectedFilter.next(this.filterList);
    this.removedFilter.next(removedFilter);
  }
}
