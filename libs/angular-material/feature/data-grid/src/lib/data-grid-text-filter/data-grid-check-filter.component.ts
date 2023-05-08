import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from "@angular/cdk/tree";
import { Filter, FilterNestedNode } from "../data-grid.model";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { DataGridStateService } from "../data-grid-state.service";

@Component({
  selector: 'local-angular-material-data-grid-text-filter',
  templateUrl: './data-grid-check-filter.component.html',
  styleUrls: ['./data-grid-check-filter.component.scss'],
})
export class DataGridCheckFilterComponent implements OnInit {

  @Input() data!: Filter[];
  @Input() label!: string;

  treeControl = new NestedTreeControl<FilterNestedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FilterNestedNode>();

  @Output() filtered = new EventEmitter<Filter>();

  constructor(
    private readonly dataGridStateService: DataGridStateService
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.mapToFlatNodes();
  }

  hasChild = (_: number, node: FilterNestedNode) => !!node.children && node.children.length > 0;

  nodeClicked(node: FilterNestedNode): void {

    node.checked = !node.checked;
    const filter = this.mapToFilter(node);

    if (!filter) {
      return;
    }

    if (node.checked) {
      this.dataGridStateService.addFilter(filter)
    } else {
      this.dataGridStateService.removeFilter(filter);
    }
  }

  private mapToFlatNodes(): FilterNestedNode[] {
    return [{
      value: this.label,
      children: this.data.map(node => ({value: node.value, hitCount: node.hitCount, checked: node.selected}))
    }];
  }

  private mapToFilter(node: FilterNestedNode): Filter | undefined {
    return this.data.find(filter => filter.value === node.value);
  }
}
