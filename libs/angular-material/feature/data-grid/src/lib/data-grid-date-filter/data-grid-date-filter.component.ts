import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import moment, { Moment } from "moment";
import { DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject } from "rxjs";
import { DateFilter } from "../models/date-filter.model";
import { Filter } from "../models/filter.model";

@Component({
  selector: 'local-angular-material-data-grid-date-filter',
  templateUrl: './data-grid-date-filter.component.html',
  styleUrls: ['./data-grid-date-filter.component.scss'],
})
export class DataGridDateFilterComponent implements OnDestroy {

  @Input() label = '';
  @Input() column = '';
  @Input() set removedFilter(filter: Filter[]) {
    this.resetFilter();
  }

  maxDate: Moment;
  fromDate!: Moment | null;
  toDate!: Moment | null;

  private readonly unsubscribe = new Subject<void>();

  @Output() updateColumn = new EventEmitter<Filter>();
  @Output() removeColumn = new EventEmitter<void>();

  constructor(
  ) {
    this.maxDate = moment();
    this.resetFilter();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  fromDateChanged<D extends Moment>(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<D>>, DateRange<D>>) {
    this.fromDate = event.value;
  }

  toDateChanged<D extends Moment>(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<D>>, DateRange<D>>) {
    this.toDate = event.value;
  }

  datePickerClosed() {
    this.updateFilterState();
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.code.match('Enter') !== null) {
      this.updateFilterState();
    }
  }

  private resetFilter() {
    this.fromDate = null;
    this.toDate = null;
  }

  private updateFilterState() {
    const updatedFilter = new DateFilter({
      value: {from: this.fromDate, to: this.toDate},
      label: this.label,
      column: this.column
    });

    if (updatedFilter.value) {
      this.updateColumn.emit(updatedFilter);
    } else {
      this.removeColumn.emit();
    }
  }
}
