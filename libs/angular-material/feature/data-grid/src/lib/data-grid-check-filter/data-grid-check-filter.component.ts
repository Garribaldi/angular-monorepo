import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { Filter, FilterNestedNode } from "../data-grid.model";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { DataGridStateService } from "../data-grid-state.service";
import { Subject, takeUntil } from "rxjs";

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
    private readonly dataGridStateService: DataGridStateService
  ) {
    this.dataGridStateService.selectedFilter$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
      filters => {
        this.updateSelectedFilters(filters);
      }
    );
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
      this.dataGridStateService.addFilter(filter);
    } else {
      this.dataGridStateService.removeFilter(filter);
    }
  }

  resetFilter() {
    this.filtersSelected = 0;
    this.resetColumn.emit();
  }

  private mapToFlatNodes(): FilterNestedNode[] {
    return [{
      value: this.filters[0].label,
      children: this.filters.map(node => ({value: node.value, hitCount: node.hitCount}))
    }];
  }

  private mapToFilter(node: FilterNestedNode): Filter | undefined {
    return this.filters.find(filter => filter.value === node.value);
  }

  private updateSelectedFilters(filters: Filter[]) {
    const currentFilter = filters.filter(filter=> this.filters.includes(filter));

    this.dataSource.data.forEach(data => data.children?.map(child => child.checked = !!currentFilter.find(filter => filter.value === child.value) ?? false));
    const data = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = data;

    this.filtersSelected = currentFilter.length;
  }
}
