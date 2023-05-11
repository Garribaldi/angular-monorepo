import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { FilterNestedNode } from "../models/filter-nested-node.model";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { Subject, takeUntil } from "rxjs";
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

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
    this.selectedFilterService.selectedFilter$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(filters => {
        const column = this.filters?.reduce((acc, curr) => curr.column, '') ?? '';
        this.updateSelectedFilters(filters.get(column) ?? []);
      });

    this.selectedFilterService.resetAll$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.treeControl.collapseAll());
  }

  ngOnInit() {
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
   * @param updatedFilters updated filter list
   * @private
   */
  private updateSelectedFilters(updatedFilters: Filter[]) {
    this.dataSource.data.forEach(data =>
      data.children?.map(child =>
        child.checked = !!updatedFilters.find(filter => filter.value === child.value)
      )
    );
    const data = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = data;

    this.filtersSelected = updatedFilters.length;
  }
}
