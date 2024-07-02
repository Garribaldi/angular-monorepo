import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Filter, GroupedFilter } from '@local/angular-material/data-grid/utils';

@Component({
  selector: 'local-angular-material-data-grid-chips-bar',
  templateUrl: './data-grid-chips-bar.component.html',
  styleUrls: ['./data-grid-chips-bar.component.scss'],
})
export class DataGridChipsBarComponent {

  @Input() groupedFilter?: GroupedFilter;
  @Input() enableResetAll?: boolean;

  @Output() removeFilter = new EventEmitter<Filter>();
  @Output() removeAllFilter = new EventEmitter<void>();

  constructor(
    private readonly faIconLibrary: FaIconLibrary
  ) {
    this.faIconLibrary.addIcons(faXmark);
  }

  remove(filter: Filter) {
    this.removeFilter.emit(filter);
  }

  removeAll() {
    this.removeAllFilter.emit();
  }
}
