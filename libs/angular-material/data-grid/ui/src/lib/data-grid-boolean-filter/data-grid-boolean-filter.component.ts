import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanFilter, Filter } from '@local/angular-material/data-grid/utils';

type BooleanFilterValues = 'true' | 'false' | '';

@Component({
  selector: 'local-angular-material-data-grid-boolean-filter',
  templateUrl: './data-grid-boolean-filter.component.html',
  styleUrl: './data-grid-boolean-filter.component.scss',
})
export class DataGridBooleanFilterComponent {

  @Input() filter?: Filter;

  @Input() set removedFilter(_filter: Filter[]) {
    this.selectedOption = '';
  }

  hasFocus = false;

  selectedOption: BooleanFilterValues = '';

  @Output() updateColumn = new EventEmitter<Filter>();
  @Output() removeColumn = new EventEmitter<void>();

  updateFilter(value: BooleanFilterValues) {
    if (value === '') {
      this.removeColumn.emit();
      return;
    }

    const updatedFilter = new BooleanFilter({
      value: value === 'true',
      label: this.filter?.label,
      column: this.filter?.column ?? ''
    });

    this.updateColumn.emit(updatedFilter);
  }
}
