import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataSourceService } from "../data-source.service";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { Filter } from "../models/filter.model";
import { GroupedFilter } from "../models/grouped-filter.model";
import { Datasource } from "../models/datasource.model";
import { Subject, takeUntil } from "rxjs";

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
