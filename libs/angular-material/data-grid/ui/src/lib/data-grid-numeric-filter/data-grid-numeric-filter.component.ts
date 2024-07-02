import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter, NumericFilter } from '@local/angular-material/data-grid/utils';

@Component({
  selector: 'local-angular-material-data-grid-numeric-filter',
  templateUrl: './data-grid-numeric-filter.component.html',
  styleUrl: './data-grid-numeric-filter.component.scss'
})
export class DataGridNumericFilterComponent implements OnInit {

  @Input() filter?: Filter;

  @Input({required: true}) minValue!: number;
  @Input({required: true}) maxValue!: number;

  @Input() set removedFilter(_filter: Filter[]) {
    this.min = this.minValue;
    this.max = this.maxValue;
  }

  min = 0;
  max = 0;

  hasFocus = false;

  @Output() updateColumn = new EventEmitter<Filter>();
  @Output() removeColumn = new EventEmitter<void>();

  ngOnInit() {
    this.min = this.minValue;
    this.max = this.maxValue;
  }

  updateFilter() {
    if (this.min === this.minValue && this.max === this.maxValue) {
      this.removeColumn.emit();
      return;
    }

    const updatedFilter = new NumericFilter({
      value: {min: this.min, max: this.max},
      column: this.filter?.column ?? '',
      label: this.filter?.label
    });

    this.updateColumn.emit(updatedFilter);
  }
}
