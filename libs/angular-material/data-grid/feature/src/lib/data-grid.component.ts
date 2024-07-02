import { Component, computed, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Datasource, DatasourceService, Filter, GroupedFilter, PanelStateService, SelectedFilterStateService } from '@local/angular-material/data-grid/utils';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp, faFilter, faRotateRight } from '@fortawesome/free-solid-svg-icons';

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
  providers: [
    DatasourceService,
    SelectedFilterStateService,
    PanelStateService
  ]
})
export class DataGridComponent<T extends Datasource<T>> implements OnInit, OnDestroy {
  /**
   * Provide a datasource array to filter.
   *
   * Every new datasource is filtered initially and returns the filtered result.
   *
   * If filters are set when a new datasource is provided, these filters are applied.
   *
   * @param {object[]} dataSource
   */
  @Input() set dataSource(dataSource: T[]) {
    this.dataSourceService.dataSource = dataSource;
    this.totalItems = dataSource.length;
    if (this.groupedFilter()) {
      this.dataSourceService.applyFilter(this.groupedFilter() as GroupedFilter);
    }
  }

  /**
   * Name of a single dataset to show in panel results.
   *
   * If no value ist provided, a default text will be used.
   *
   * @type {string}
   */
  @Input() datasetLabel?: string;
  /**
   * Show reset-all button in expansion panel header.
   *
   * Default is _true_
   */
  @Input() enableResetAllButton = true;

  panelOpenState = false;
  totalItems = 0;
  filteredItems = 0;

  private readonly unsubscribe = new Subject<void>();
  private readonly state = {
    groupedFilter: signal<GroupedFilter | undefined>(undefined)
  };

  readonly groupedFilter = computed(() => this.state.groupedFilter());
  readonly filterAmount = computed(() => {
    let count = 0;
    this.state.groupedFilter()?.forEach(filter => count += filter.length);
    return count;
  });

  @Output() filtered = new EventEmitter<T[]>();

  constructor(
    private readonly dataSourceService: DatasourceService<T>,
    private readonly selectedFilterStateService: SelectedFilterStateService,
    private readonly panelStateService: PanelStateService,
    private readonly faIconLibrary: FaIconLibrary
  ) {
    this.faIconLibrary.addIcons(
      faFilter,
      faChevronDown,
      faChevronUp,
      faRotateRight
    );
  }

  ngOnInit() {
    this.selectedFilterStateService.selectedFilter$
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((selectedFilter) => {
        this.dataSourceService.applyFilter(selectedFilter);
        this.state.groupedFilter.set(selectedFilter);
      });

    this.dataSourceService.filteredData$
      .pipe(
        tap(filteredData => this.filteredItems = filteredData.length),
        takeUntil(this.unsubscribe)
      )
      .subscribe((filteredData) => {
        this.filtered.emit(filteredData);
      });
  }

  ngOnDestroy() {
    this.selectedFilterStateService.removeAllFilter();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  removeFilter(filter: Filter) {
    this.selectedFilterStateService.removeFilter(filter);
  }

  removeAllFilter(event?: Event) {
    event?.stopPropagation();
    this.selectedFilterStateService.removeAllFilter();
  }

  openPanel() {
    this.panelOpenState = true;
    this.panelStateService.setPanelState(true);
  }

  closePanel() {
    this.panelOpenState = false;
    this.panelStateService.setPanelState(false);
  }
}
