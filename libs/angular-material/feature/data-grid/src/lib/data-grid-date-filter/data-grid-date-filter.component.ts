import { Component, Input, OnDestroy } from '@angular/core';
import moment, { Moment, now } from "moment";
import { DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { filter, Subject, takeUntil } from "rxjs";
import { DateFilter } from "../models/date-filter.model";

@Component({
  selector: 'local-angular-material-data-grid-date-filter',
  templateUrl: './data-grid-date-filter.component.html',
  styleUrls: ['./data-grid-date-filter.component.scss'],
})
export class DataGridDateFilterComponent implements OnDestroy {

  @Input() label = '';
  @Input() column = '';

  maxDate!: Moment;
  fromDate: Moment | null = moment(now());
  toDate: Moment | null = moment(now());

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
    this.maxDate = moment();
    this.selectedFilterService.selectedFilter$
      .pipe(
        takeUntil(this.unsubscribe),
        filter(filters => !filters.get(this.column))
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
