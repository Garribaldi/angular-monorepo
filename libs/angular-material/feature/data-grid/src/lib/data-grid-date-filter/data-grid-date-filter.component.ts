import { Component, Input } from '@angular/core';
import moment, { Moment } from "moment";
import { DateRange, ExtractDateTypeFromSelection, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject } from "rxjs";
import { Filter, FilterDate } from "../data-grid.model";
import { isValidFilterDate } from "../data-grid.utils";
import { DataGridStateService } from "../data-grid-state.service";

@Component({
  selector: 'local-angular-material-data-grid-date-filter',
  templateUrl: './data-grid-date-filter.component.html',
  styleUrls: ['./data-grid-date-filter.component.scss'],
})
export class DataGridDateFilterComponent {

  @Input() filter!: Filter[];

  maxDate!: Moment;
  fromDate: Moment | null = null;
  toDate: Moment | null = null;
  opened = false;

  private readonly focus = new Subject<boolean>();

  constructor(
    private readonly dataGridStateService: DataGridStateService
  ) {
    this.maxDate = moment();
  }


  onFocusIn() {
    this.focus.next(true);
  }

  onFocusOut() {
    this.focus.next(false);
  }

  fromDateChanged<D extends Moment>(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<D>>, DateRange<D>>) {
    this.fromDate = event.value;
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.code.match('Enter') !== null) {
      this.updateFilterState();
    }
  }

  toDateChanged<D extends Moment>(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<D>>, DateRange<D>>) {
    this.toDate = event.value;
  }

  datePickerOpened() {
    this.opened = true;
  }

  datePickerClosed() {
    this.opened = false;
    this.updateFilterState();
  }

  private updateFilterState() {
    const filterDate = this.mapToFilterDate(this.fromDate, this.toDate);

    console.log(filterDate);

    if (isValidFilterDate(filterDate)) {
      const updatedFilter: Filter = {...this.filter[0], value: filterDate};
      this.dataGridStateService.unpdateFiltersByColumn(updatedFilter);
    } else {
      this.dataGridStateService.removeFiltersByColumn(this.filter[0].column);
    }
  }

  private mapToFilterDate(from: Moment | null, to: Moment | null): FilterDate {
    return {
      from: from?.toDate(),
      to: to?.toDate()
    };
  }
}
