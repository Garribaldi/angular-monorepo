import { Component, Input, OnInit } from '@angular/core';
import { DataSourceService } from "../data-source.service";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { FilterType } from "../models/filter-type.model";
import { Filter } from "../models/filter.model";
import { assertCannotReach } from "@local/shared/utils";
import { Datasource } from "../models/datasource.model";

@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent<T extends Datasource<T>> implements OnInit {

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
    switch (this.type) {
      case FilterType.CHECK_FILTER:
        this.filters = this.dataSourceService.getCheckFilters(this.column, this.label);
        break
      case FilterType.DATE_FILTER:
        break
      default:
        assertCannotReach(this.type);
    }
  }

  resetColumn() {
    this.selectedFilterService.removeFiltersByColumn(this.column);
  }
}
