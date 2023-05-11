import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataSourceService } from "../data-source.service";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { Filter } from "../models/filter.model";
import { GroupedFilter } from "../models/grouped-filter.model";
import { Datasource } from "../models/datasource.model";
import { Subject, takeUntil } from "rxjs";

/**
 * This is a wrapper component that organizes all filtering.
 *
 * Provide a __dataSource__ as an object array where the objects need to have a flat hierarchy.
 * Allowed types for filtering data are __string__, __number__ and __Date__.
 *
 * Every time the datasource has been touched, the __filtered__ event is triggered and provides
 * the filter result to display in your component.
 */
@Component({
  selector: 'local-angular-material-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends Datasource<T>> implements OnInit, OnDestroy {

  @Input() dataSource?: T[];

  filters: GroupedFilter | undefined;

  @Output() filtered = new EventEmitter<T[]>();

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly dataSourceService: DataSourceService<T>,
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
  }

  ngOnInit() {
    this.dataSourceService.dataSource = this.dataSource ?? [];

    this.selectedFilterService.selectedFilter$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(filters => {
        this.dataSourceService.filter(filters);
        this.filtered.next(this.dataSourceService.filteredData);
        this.filters = filters;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  removeFilter(filter: Filter) {
    this.selectedFilterService.removeFilter(filter);
  }

  removelAllFilter() {
    this.selectedFilterService.removeAllFilters();
  }
}
