import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from "../data-source.service";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { Filter, GroupedFilter } from "../data-grid-filter.model";

@Component({
  selector: 'local-angular-material-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent<T extends Record<string, any>> implements OnInit {

  @Input() dataSource?: T[];

  filters: GroupedFilter | undefined;

  @Output() filtered = new EventEmitter<T[]>();

  constructor(
    private readonly dataSourceService: DataSourceService<T>,
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
  }

  ngOnInit() {
    this.dataSourceService.dataSource = this.dataSource ?? [];

    this.selectedFilterService.selectedFilter$
      .subscribe(filters => {
        this.dataSourceService.filter(filters);
        this.filtered.next(this.dataSourceService.filteredData);
        this.filters = filters;
      });
  }

  removeFilter(filter: Filter) {
    this.selectedFilterService.removeFilter(filter);
  }

  removelAllFilter() {
    this.selectedFilterService.removeAllFilters();
  }
}
