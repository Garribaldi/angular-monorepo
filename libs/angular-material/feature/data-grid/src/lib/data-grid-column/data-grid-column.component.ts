import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DataSourceService } from "../data-source.service";
import { FilterType } from "../models/filter-type.model";
import { Filter } from "../models/filter.model";
import { assertCannotReach, convertToSlashCase } from "@local/shared/utils";
import { Datasource } from "../models/datasource.model";

/**
 * This component is a shell to represent a column that matches a property in your datasource.
 *
 * Provide a __column__ that matches the name of this property.
 * You also need to specify the __FilterType__ (_Check_ and _Date_ are supported at the moment).
 * The __label__ ist displayed as a filter headline or placeholder.
 */
@Component({
  selector: 'local-angular-material-data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss'],
})
export class DataGridColumnComponent<T extends Datasource<T>> implements OnInit {

  @HostBinding('attr.data-cy') cypressSelector!: string;

  @Input() column!: string;
  @Input() type!: FilterType;
  @Input() label!: string;

  readonly filterType = FilterType;

  filters: Filter[] = [];

  constructor(
    private readonly dataSourceService: DataSourceService<T>
  ) {
  }

  ngOnInit() {
    this.cypressSelector = `data-grid-filter-for-${convertToSlashCase(this.column)}`;

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
}
