import { Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil } from 'rxjs';
import { ColumnDef, } from '@local/shared/data-access';
import { NgTemplateNameDirective } from "@local/shared/utils";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'agr-angular-material-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent<T extends object> implements OnChanges {
  @ContentChildren(NgTemplateNameDirective)
  templates!: QueryList<NgTemplateNameDirective>;

  dataSource = new MatTableDataSource<T>();
  displayedColumns: string[] = [];

  readonly searchFilter = new Subject<EventTarget | null>();
  /**
   * __Optional__
   * A key value pair where the key should be matching the columns
   * in the table data and the value should be the column display name
   * If no column definition is provided, the keys from the table data will be used
   */
  @Input() columnDefinition: ColumnDef = {};
  /**
   * Enable a separate row with crud operation symbols:
   * - add row
   * - show details
   * - edit row
   * - delete row
   *
   * __Default: false__
   */
  @Input() showCrudOperations = false;

  /**
   * This is an array of the table data to be displayed
   *
   * @param data table data array
   */
  @Input() set tableData(data: T[]) {
    this.dataSource.data = data;
  }

  private readonly unsubscribe = new Subject<void>();

  constructor() {
    this.searchFilter
      .asObservable()
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(500),
        filter(
          (eventTarget): eventTarget is HTMLInputElement => eventTarget !== null
        ),
        map((eventTarget) => eventTarget.value),
        distinctUntilChanged()
      )
      .subscribe(
        (filterValue) =>
          (this.dataSource.filter = filterValue.trim().toLowerCase())
      );
  }

  /**
   * If column definition is not provided, use table data keys as table column header.
   * If crud operations are enabled, add column definition for actions.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    let columnDefinition: ColumnDef =
      changes['columnDefinition']?.currentValue ?? this.columnDefinition;
    const tableData: T[] = changes['tableData']?.currentValue ?? [];

    const columnDefinitionIsEmpty = Object.keys(columnDefinition).length < 1;
    const tableDataNotEmpty = tableData.length > 0;

    if (columnDefinitionIsEmpty && tableDataNotEmpty) {
      Object.keys(tableData[0]).forEach((key) => (columnDefinition[key] = key));
    }

    if (this.showCrudOperations) {
      columnDefinition = {_crudOperations: 'Action', ...columnDefinition};
    }

    this.columnDefinition = {...columnDefinition};
    this.displayedColumns = Object.keys(columnDefinition);
  }
}
