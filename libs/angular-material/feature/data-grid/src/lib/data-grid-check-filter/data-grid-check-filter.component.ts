import { Component, Input, OnDestroy } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { FilterNestedNode } from "../models/filter-nested-node.model";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { map, Subject, takeUntil } from "rxjs";
import { Filter } from "../models/filter.model";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: 'local-angular-material-data-grid-check-filter',
  templateUrl: './data-grid-check-filter.component.html',
  styleUrls: ['./data-grid-check-filter.component.scss'],
})
export class DataGridCheckFilterComponent implements OnDestroy {

  private _filter: Filter[] = [];
  @Input() set filter (filter: Filter[]) {
    this._filter = filter;
    this.column = filter?.reduce((acc, curr) => curr.column, '') ?? '';
    this.dataSource.data = this.mapToFlatNodes();
  }

  treeControl = new NestedTreeControl<FilterNestedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FilterNestedNode>();
  filtersSelected = 0;

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
      .subscribe(filter => {
        this.removeSelectedFilter(filter);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  hasChild = (_: number, node: FilterNestedNode) => !!node.children && node.children.length > 0;

  nodeClicked(node: FilterNestedNode, event: MatCheckboxChange): void {
    node.checked = event.checked;

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
    this.selectedFilterService.removeFilterByColumn(this.column);
    this.treeControl.collapseAll();
  }

  private mapToFlatNodes(): FilterNestedNode[] {
    return [{
      value: this._filter[0]?.label ?? null,
      children: this._filter.map(filter => ({value: filter.displayValue, hitCount: filter.hitCount}))
    }];
  }

  private mapToFilter(node: FilterNestedNode): Filter | undefined {
    return this._filter.find(filter => filter.value === node.value);
  }

  /**
   * After filterlist has changed, find matching filter for current column in new list
   * and update _checked_ status.
   * @param removedFilter list of removed filter for this column
   * @private
   */
  private removeSelectedFilter(removedFilter: Filter[]) {
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
    if (this.filtersSelected === 0) {
      this.treeControl.collapseAll();
    }
  }
}
