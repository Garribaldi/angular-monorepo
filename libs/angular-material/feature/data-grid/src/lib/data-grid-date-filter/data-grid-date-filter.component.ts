import { Component, Input, OnDestroy } from '@angular/core';
import moment, { Moment } from "moment";
import { DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { map, Subject, takeUntil } from "rxjs";
import { DateFilter } from "../models/date-filter.model";

@Component({
  selector: 'local-angular-material-data-grid-date-filter',
  templateUrl: './data-grid-date-filter.component.html',
  styleUrls: ['./data-grid-date-filter.component.scss'],
})
export class DataGridDateFilterComponent implements OnDestroy {

  @Input() label = '';
  @Input() column = '';

  maxDate: Moment;
  fromDate!: Moment | null;
  toDate!: Moment | null;

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
    this.maxDate = moment();
    this.resetFilter();
    
    this.selectedFilterService.removedFilter$
      .pipe(
        takeUntil(this.unsubscribe),
        map(removedFilter => removedFilter.filter(filter => filter.column === this.column))
      )
      .subscribe(() => this.resetFilter());
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
      this.selectedFilterService.updateFiltersByColumn(updatedFilter, this.column);
    } else {
      this.selectedFilterService.removeFiltersByColumn(this.column);
    }
  }
}
