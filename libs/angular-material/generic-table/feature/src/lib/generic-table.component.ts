import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ColumnDef } from '@local/shared/data-access';
import { NgTemplateNameDirective } from '@local/shared/utils';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'local-angular-material-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T extends { [property in keyof T]: number | string }> implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ContentChildren(NgTemplateNameDirective) templates!: QueryList<NgTemplateNameDirective>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

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

  dataSource = new MatTableDataSource<T>();
  displayedColumns: string[] = [];

  readonly searchFilter = new BehaviorSubject<string>('');

  private readonly unsubscribe = new Subject<void>();

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() add = new EventEmitter<void>();

  ngOnInit() {
    this.searchFilter.asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe(
        (value) => (this.dataSource.filter = value.trim().toLowerCase())
      );
  }

  /**
   * If column definition is not provided, use table data keys as table column header.
   *
   * If crud operations are enabled, add column definition for actions.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    let columnDefinition: ColumnDef = changes['columnDefinition']?.currentValue ?? this.columnDefinition;
    const tableData: T[] = changes['tableData']?.currentValue ?? [];

    const columnDefinitionIsEmpty = Object.keys(columnDefinition).length < 1;
    const tableDataNotEmpty = tableData.length > 0;

    if (columnDefinitionIsEmpty && tableDataNotEmpty) {
      Object.keys(tableData[0]).forEach((key) => (columnDefinition[key] = key));
    }

    if (this.showCrudOperations) {
      columnDefinition = {...columnDefinition, _crudOperations: 'Action'};
    }

    this.columnDefinition = {...columnDefinition};
    this.displayedColumns = Object.keys(columnDefinition);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Search can be triggered by input event or with a new string value.
   * This type guard ensures that only a string is passed to search subject.
   * @param event input event from HTMLInputElement or string value
   */
  updateSearch(event: EventTarget | string | null): void {
    let value: string;
    if (event instanceof EventTarget) {
      value = (event as HTMLInputElement).value;
    } else {
      value = event ?? '';
    }

    this.searchFilter.next(value);
  }

  onEdit(row: T) {
    this.edit.emit(row);
  }

  onDelete(row: T) {
    this.delete.emit(row);
  }

  onAdd() {
    this.add.emit();
  }
}
