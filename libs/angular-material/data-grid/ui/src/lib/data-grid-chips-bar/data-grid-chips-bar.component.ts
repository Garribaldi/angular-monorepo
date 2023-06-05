import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, GroupedFilter } from '@local/angular-material/data-grid/data-access';

@Component({
  selector: 'local-angular-material-data-grid-chips-bar',
  templateUrl: './data-grid-chips-bar.component.html',
  styleUrls: ['./data-grid-chips-bar.component.scss'],
})
export class DataGridChipsBarComponent {
  @Input() groupedFilter?: GroupedFilter;

  @Output() removeFilter = new EventEmitter<Filter>();
  @Output() removelAllFilter = new EventEmitter<void>();

  remove(filter: Filter) {
    this.removeFilter.emit(filter);
  }

  removeAll() {
    this.removelAllFilter.emit();
  }
}
