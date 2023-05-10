import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import moment, { Moment, now } from "moment";
import { DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Filter, FilterDate } from "../data-grid-filter.model";
import { isValidFilterDate } from "../data-grid.utils";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'local-angular-material-data-grid-date-filter',
  templateUrl: './data-grid-date-filter.component.html',
  styleUrls: ['./data-grid-date-filter.component.scss'],
})
export class DataGridDateFilterComponent implements OnInit, OnDestroy {

  @Input() filter!: Filter;

  maxDate!: Moment;
  fromDate: Moment | null = moment(now());
  toDate: Moment | null = moment(now());

  label = '';

  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly selectedFilterService: SelectedFilterStateService
  ) {
    this.maxDate = moment();
    this.selectedFilterService.selectedFilter$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        filters => {
          this.resetFilter(filters);
        }
      );
  }

  ngOnInit() {
    this.label = this.filter.label;
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

  resetFilter(filters: Filter[]) {
    const currentFilter = filters.filter(filter => filter.id === this.filter.id);
    if (!currentFilter.length) {
      this.fromDate = null;
      this.toDate = null;
    }
  }

  private updateFilterState() {
    const filterDate = this.mapToFilterDate(this.fromDate, this.toDate);

    if (isValidFilterDate(filterDate)) {
      const updatedFilter: Filter = {
        ...this.filter,
        value: filterDate,
        displayValue: `${filterDate.from?.format('L') ?? ''} - ${filterDate.to?.format('L') ?? ''}`
      };
      this.selectedFilterService.unpdateFiltersByColumn(updatedFilter);
    } else {
      this.selectedFilterService.removeFiltersByColumn(this.filter.column);
    }
  }

  private mapToFilterDate(from: Moment | null, to: Moment | null): FilterDate {
    return {from, to};
  }
}
