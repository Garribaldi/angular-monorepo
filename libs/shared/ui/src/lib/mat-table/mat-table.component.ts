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
   * __Optional__
   * A key value pair where the key should be matching the columns
   * in the table data and the value should be the column display name
   * If no column definition is provided, the keys from the table data will be used
   */
  @Input() columnDefinition: ColumnDef = {};
  @Input() showCrudOperations = false;

  /**
   * This is an array of the table data to be displayed
   *
   * @param data table data array
   */
  @Input() set tableData(data: T[]) {
    this.dataSource.data = data;
  }

  /**
   * If column definition is not provided, use table data keys as table column header
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    let columnDefinition: ColumnDef = changes['columnDefinition']?.currentValue ?? this.columnDefinition;
    const tableData: T[] = changes['tableData']?.currentValue ?? [];

    const columnDefinitionIsEmpty = Object.keys(columnDefinition).length < 1;
    const tableDataNotEmpty = tableData.length > 0;

    if (columnDefinitionIsEmpty && tableDataNotEmpty) {
      Object.keys(tableData[0]).forEach(key => columnDefinition[key] = key);
      this.columnDefinition = {...columnDefinition};
    }

    if (this.showCrudOperations) {
      columnDefinition = {
        '_crudOperations': 'Action',
        ...columnDefinition
      }
    }

    this.columns = Object.keys(columnDefinition);
  }

  applySearchFilter(target: EventTarget | null) {
    const filterValue = (target as HTMLInputElement).value ?? '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
