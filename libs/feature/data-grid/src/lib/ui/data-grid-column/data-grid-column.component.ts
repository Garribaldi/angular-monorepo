import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { assertCannotReach } from '@local/shared/utils';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { Datasource, DatasourceService, Filter, FilterType, getDefaultBooleanFilter, getDefaultDateFilter, getDefaultNumericFilter, getDefaultSearchFilter, SelectedFilterStateService } from '@local/angular-material/data-grid/utils';

/**
 * This component is a shell to represent a column that matches a property in your datasource.
 *
 * Provide a __column__ that matches the name of this property.
 * You also need to specify the __FilterType__ (_Check_ and _Date_ are supported at the moment).
 * The __label__ ist displayed as a filter headline or placeholder.
 */
@Component({
  selector: 'data-grid-column',
  templateUrl: './data-grid-column.component.html',
  styleUrls: ['./data-grid-column.component.scss']
})
export class DataGridColumnComponent<T extends Datasource<T>> implements OnInit, OnDestroy {
  @Input({required: true}) column!: string;
  @Input({required: true}) type!: FilterType;
  @Input({required: true}) label!: string;

  filter: Filter | Filter[] | undefined;

  removedFilter: Filter[] = [];

  minValue = 0;
  maxValue = 0;

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly dataSourceService: DatasourceService<T>,
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
  }

  ngOnInit() {
    this.listenOnDatasourceChanges();
    this.listenOnRemovedFilter();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addFilter(filter: Filter) {
    this.selectedFilterService.addFilter(filter);
  }

  removeFilter(filter: Filter) {
    this.selectedFilterService.removeFilter(filter);
  }

  removeFilterByColumn() {
    this.selectedFilterService.removeFilterByColumn(this.column);
  }

  updateFilterByColumn(filter: Filter) {
    this.selectedFilterService.updateFilterByColumn(filter, this.column);
  }

  private listenOnRemovedFilter() {
    this.selectedFilterService.removedFilter$
      .pipe(
        takeUntil(this.unsubscribe),
        map(removedFilter => removedFilter.filter(filter => filter.column === this.column)),
        filter(removedFilter => removedFilter.length > 0)
      )
      .subscribe((filter) => this.removedFilter = filter);
  }

  private listenOnDatasourceChanges() {
    this.dataSourceService.dataSourceChanged$
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.setDefaultFilter());
  }

  private setDefaultFilter() {
    switch (this.type) {
      case 'check':
        this.filter = this.dataSourceService.getCheckFilterForColumn(this.column, this.label);
        break;

      case 'date':
        this.filter = getDefaultDateFilter(this.column, this.label);
        break;

      case 'search':
        this.filter = getDefaultSearchFilter(this.column, this.label);
        break;

      case 'boolean':
        this.filter = getDefaultBooleanFilter(this.column, this.label);
        break;

      case 'number':
        this.minValue = this.dataSourceService.getMinValue(this.column);
        this.maxValue = this.dataSourceService.getMaxValue(this.column);
        this.filter = getDefaultNumericFilter(this.column, this.label, this.minValue, this.maxValue);
        break;

      default:
        assertCannotReach(this.type);
    }
  }
}
