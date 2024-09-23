import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { filter, Subject, takeUntil } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Filter, FilterNestedNode, PanelStateService } from '@local/angular-material/data-grid/utils';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'data-grid-check-filter',
  templateUrl: './data-grid-check-filter.component.html',
  styleUrls: ['./data-grid-check-filter.component.scss'],
})
export class DataGridCheckFilterComponent implements OnInit, OnDestroy {

  private _filter: Filter[] = [];
  @Input() set filter(filter: Filter[]) {
    this._filter = filter;
    this.dataSource.data = this.mapToFlatNodes();
  }

  @Input() set removedFilter(filter: Filter[]) {
    this.removeSelectedFilter(filter);
  }

  treeControl = new NestedTreeControl<FilterNestedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FilterNestedNode>();
  filtersSelected = 0;
  isExpanded = false;
  filterString = '';

  private readonly unsubscribe = new Subject<void>();

  @Output() removeColumn = new EventEmitter<void>();
  @Output() addFilter = new EventEmitter<Filter>();
  @Output() removeFilter = new EventEmitter<Filter>();

  constructor(
    private readonly faIconLibrary: FaIconLibrary,
    private readonly panelStateService: PanelStateService
  ) {
    this.faIconLibrary.addIcons(faChevronRight, faChevronDown, faXmark, faFilter);
  }

  ngOnInit() {
    this.panelStateService.panelOpen$
      .pipe(
        filter(isOpen => !isOpen),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => this.treeControl.collapseAll());
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  hasChild = (_: number, node: FilterNestedNode) => !!node.children && node.children.length > 0;

  hideNode(node: FilterNestedNode): boolean {
    if (!this.filterString) {
      return false;
    }
    return !String(node.value).toLowerCase().includes(this.filterString.toLowerCase());
  }

  nodeClicked(node: FilterNestedNode, event: MatCheckboxChange): void {
    node.checked = event.checked;

    const filter = this.mapToFilter(node);
    if (!filter) {
      return;
    }

    if (node.checked) {
      this.addFilter.emit(filter);
    } else {
      this.removeFilter.emit(filter);
    }

    this.updateSelectedFilterAmount();
  }

  /**
   * Remove all filter by emitting removeColumn event.
   *
   * This triggers removedFilter input which unchecks all filter.
   */
  resetFilter() {
    this.filtersSelected = 0;
    this.removeColumn.emit();
  }

  /**
   * Check all nodes and emit new filter state.
   */
  selectAll() {
    this.dataSource.data[0].children?.forEach(node => {
      node.checked = true;
      const filter = this.mapToFilter(node) as Filter;
      this.addFilter.emit(filter);
    });
    this.updateSelectedFilterAmount();
  }

  private mapToFlatNodes(): FilterNestedNode[] {
    return [
      {
        value: this._filter[0]?.label ?? null,
        children: this._filter.map((filter) => ({
          value: filter.displayValue,
          hitCount: filter.hitCount
        }))
      }
    ];
  }

  private mapToFilter(node: FilterNestedNode): Filter | undefined {
    return this._filter.find((filter) => filter.displayValue === node.value);
  }

  /**
   * After filterlist has changed, find matching filter for current column in new list
   * and update _checked_ status.
   * @param removedFilter list of removed filter for this column
   * @private
   */
  private removeSelectedFilter(removedFilter: Filter[]) {
    const nestedNodes =  this.dataSource.data[0].children;
    const uncheckedNodes = nestedNodes
      ? nestedNodes.filter(childNode => !!removedFilter.find(filter => childNode.checked && filter.displayValue === childNode.value))
      : [];

    uncheckedNodes.forEach(childNode => (childNode.checked = false));

    this.updateSelectedFilterAmount();
  }

  private updateSelectedFilterAmount() {
    this.filtersSelected = this.dataSource.data[0].children?.filter((childNode) => childNode.checked).length ?? 0;
  }
}
