import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { FilterNestedNode } from "../models/filter-nested-node.model";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { map, Subject, takeUntil } from "rxjs";
import { Filter } from "../models/filter.model";

@Component({
  selector: 'local-angular-material-data-grid-check-filter',
  templateUrl: './data-grid-check-filter.component.html',
  styleUrls: ['./data-grid-check-filter.component.scss'],
})
export class DataGridCheckFilterComponent implements OnInit, OnDestroy {

  @Input() filters!: Filter[];

  treeControl = new NestedTreeControl<FilterNestedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FilterNestedNode>();
  filtersSelected = 0;

  @Output() resetColumn = new EventEmitter<void>();

  private column = '';
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
    this.selectedFilterService.removedFilter$
      .pipe(
        takeUntil(this.unsubscribe),
        map(removedFilter => removedFilter.filter(filter => filter.column === this.column))
      )
      .subscribe(filter => this.removeSelectedFilters(filter));

    this.selectedFilterService.resetAll$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.treeControl.collapseAll());
  }

  ngOnInit() {
    this.column = this.filters?.reduce((acc, curr) => curr.column, '') ?? '';
    this.dataSource.data = this.mapToFlatNodes();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  hasChild = (_: number, node: FilterNestedNode) => !!node.children && node.children.length > 0;

  nodeClicked(node: FilterNestedNode): void {
    node.checked = !node.checked;
    const filter = this.mapToFilter(node);

    if (!filter) {
      return;
    }

    if (node.checked) {
      this.selectedFilterService.addFilter(filter);
    } else {
      this.selectedFilterService.removeFilter(filter);
    }

    this.updateSelectedFilterAmount();
  }

  resetFilter() {
    this.filtersSelected = 0;
    this.resetColumn.emit();
    this.treeControl.collapseAll();
  }

  private mapToFlatNodes(): FilterNestedNode[] {
    return [{
      value: this.filters[0].label ?? null,
      children: this.filters.map(node => ({value: node.displayValue, hitCount: node.hitCount}))
    }];
  }

  private mapToFilter(node: FilterNestedNode): Filter | undefined {
    return this.filters.find(filter => filter.value === node.value);
  }

  /**
   * After filterlist has changed, find matching filter for current column in new list
   * and update _checked_ status.
   * @param removedFilter list of removed filter for this column
   * @private
   */
  private removeSelectedFilters(removedFilter: Filter[]) {
    this.dataSource.data[0].children
      ?.filter(childNode => removedFilter.find(filter => childNode.checked && filter.value === childNode.value))
      .forEach(childNode => childNode.checked = false)

    const data = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = data;

    this.updateSelectedFilterAmount();
  }

  private updateSelectedFilterAmount() {
    this.filtersSelected = this.dataSource.data[0].children?.filter(childNode => childNode.checked).length ?? 0;
  }
}
