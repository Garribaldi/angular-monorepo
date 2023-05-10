import { Component, Input, OnInit } from '@angular/core';
import { Filter, FilterType } from "../data-grid-filter.model";
import { DataSourceService } from "../data-source.service";
import { SelectedFilterStateService } from "../selected-filter-state.service";

@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent<T extends Record<string, any>> implements OnInit {

  @Input() column!: string;
  @Input() type!: FilterType;
  @Input() label!: string;

  readonly filterType = FilterType;

  filters: Filter[] = [];

  constructor(
    private readonly dataSourceService: DataSourceService<T>,
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
  }

  ngOnInit() {
    this.filters = this.dataSourceService.getFiltersForColumn(this.column, this.type, this.label);
  }

  resetColumn() {
    this.selectedFilterService.removeFiltersByColumn(this.column);
  }
}
