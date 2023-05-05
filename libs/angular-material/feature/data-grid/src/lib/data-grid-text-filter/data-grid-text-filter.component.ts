import { Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from "@angular/cdk/tree";
import { ArrayDataSource } from "@angular/cdk/collections";
import { FilterFlatNode, FilterValue } from "../data-grid.model";

@Component({
  selector: 'local-angular-material-data-grid-text-filter',
  templateUrl: './data-grid-text-filter.component.html',
  styleUrls: ['./data-grid-text-filter.component.scss'],
})
export class DataGridTextFilterComponent implements OnInit {

  @Input() data!: FilterValue[];

  treeControl = new FlatTreeControl<FilterFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  dataSource!: ArrayDataSource<FilterFlatNode>;

  flatNodeData: FilterFlatNode[] = [];

  ngOnInit() {
    this.flatNodeData = this.mapToFlatNode(this.data);
    this.dataSource = new ArrayDataSource(this.flatNodeData);
  }

  hasChild = (_: number, node: FilterFlatNode) => node.expandable;

  getParentNode(node: FilterFlatNode) {
    const nodeIndex = this.flatNodeData.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.flatNodeData[i].level === node.level - 1) {
        return this.flatNodeData[i];
      }
    }

    return null;
  }

  shouldRender(node: FilterFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  private mapToFlatNode(data: FilterValue[]): FilterFlatNode[] {
    const mapped = data.map(node => ({name: node.toString(), expandable: false, level: 1} as FilterFlatNode));
    mapped.unshift({name: 'Team', expandable: true, level: 0});
    return mapped;
  }
}
