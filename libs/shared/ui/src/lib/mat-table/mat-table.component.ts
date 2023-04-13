import { Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ColumnDef } from "@local/shared/data-access";
import { NgTemplateNameDirective } from "@local/shared/utils";

@Component({
  selector: 'shared-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent<T extends object> implements OnChanges {

  @ContentChildren(NgTemplateNameDirective) templates!: QueryList<NgTemplateNameDirective>

  dataSource = new MatTableDataSource<T>();
  columns: string[] = [];

  /**
   * A key value pair where the key should be matching the columns
   * in the table data and the value should be the column display name
   */
  @Input() columnDefinition!: ColumnDef;

  /**
   * This is an array of the table data to be displayed
   *
   * @param data table data array
   */
  @Input() set tableData(data: T[]) {
    this.dataSource.data = data;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['columnDefinition']) {
      this.columns = Object.keys(this.columnDefinition);
    }
  }
}
