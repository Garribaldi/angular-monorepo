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
   * If the added filter is already in the list, it is ignored.
   *
   * You can provide a single filter or a filter array.
   * @param filter single filter or array of filter
   */

  addFilter(filter: Filter | Filter[]): void {
    let addedFilter = Array.isArray(filter) ? filter : [filter];

    const column = addedFilter[0].column;
    const columnFilter = this.filterList.get(column) ?? [];

    addedFilter = addedFilter.filter(added => !columnFilter.some(existing => existing.id === added.id));
    columnFilter.push(...addedFilter)

    this.filterList.set(column, columnFilter);
    this.selectedFilter.next(this.filterList);
  }

  /**
   * Replace a filter list by its column.
   * Provide a single filter or filter array and the column name.
   *
   * It is checked if the column and filter column properties match.
   *
   * @param filter single filter or array of filter
   * @param column name of filter column to update
   */
  updateFilterByColumn(filter: Filter | Filter[], column: string): void {
    let updatedFilter = isArray(filter) ? filter : [filter];
    updatedFilter = updatedFilter.filter(updated => updated.column === column);

    this.filterList.set(column, updatedFilter);
    this.selectedFilter.next(this.filterList);
  }

  /**
   * Removes a single filter or an array of filter from the filter list.
   * @param filter single filter or array of filter
   */
  removeFilter(filter: Filter | Filter[]): void {
    const removedFilter = isArray(filter) ? filter : [filter];

    removedFilter.forEach(removed => {
      const column = removed.column;
      const columnFilter = this.filterList.get(column) ?? [];
      const updatedColumnFilter = columnFilter.filter(existingFilter => existingFilter.id !== removed.id);

      if (updatedColumnFilter.length) {
        this.filterList.set(column, updatedColumnFilter)
      } else {
        this.filterList.delete(column);
      }
    });

    this.removedFilter.next(removedFilter);
    this.selectedFilter.next(this.filterList);
  }

  /**
   * Remove all filter from list and clear data
   */
  removeAllFilter(): void {
    const removedFilter = Array.from(this.filterList.values()).reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    })

    this.filterList.clear();

    this.selectedFilter.next(this.filterList);
    this.resetAll.next();
    this.removedFilter.next(removedFilter);
  }

  /**
   * Remove a filter list by its column.
   * Provide column name to be deleted from the list.
   *
   * @param column name of filter column to update
   */
  removeFilterByColumn(column: string): void {
    const removedFilter = this.filterList.get(column) ?? [];

    this.filterList.delete(column);

    this.selectedFilter.next(this.filterList);
    this.removedFilter.next(removedFilter);
  }
}
