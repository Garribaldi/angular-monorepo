import { Component, Input } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ColumnDef } from "@local/shared/data-access";


@Component({
  selector: 'shared-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent<T extends object> {

  /**
   * A key value pair where the key should be matching the columns
   * in the table data and the value should be the column display name
   */
  @Input() columnDefinition: ColumnDef = {};
  dataSource = new MatTableDataSource<T>();
  readonly objectKeys = Object.keys;

  /**
   * This is an array of the table data to be displayed
   *
   * @param data table data array
   */
  @Input() set tableData(data: T[]) {
    this.dataSource.data = data;
  }
}
