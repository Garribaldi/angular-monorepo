import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filter, SearchFilter } from '@local/angular-material/data-grid/utils';
import { BehaviorSubject, debounce, map, Observable, tap, timer } from 'rxjs';

@Component({
  selector: 'local-angular-material-data-grid-search-filter',
  templateUrl: './data-grid-search-filter.component.html',
  styleUrl: './data-grid-search-filter.component.scss',
})
export class DataGridSearchFilterComponent {

  @Input() filter?: Filter;

  @Input() set removedFilter(_filter: Filter[]) {
    this.reset();
  }

  private readonly searchphrase = new BehaviorSubject<string>('');
  readonly searchphrase$: Observable<{ currentSearch: string }> = this.searchphrase.asObservable().pipe(
    debounce(currentSearch => currentSearch ? timer(300) : timer(0)),
    tap(currentSearch => this.updateFilterState(currentSearch)),
    map(currentSearch => ({currentSearch}))
  );

  @Output() updateColumn = new EventEmitter<Filter>();
  @Output() removeColumn = new EventEmitter<void>();

  searchphraseChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchphrase.next(input.value);
  }

  reset() {
    this.searchphrase.next('');
  }

  private updateFilterState(searchphrase: string) {
    if (!searchphrase) {
      this.removeColumn.emit();
      return;
    }

    const updatedFilter = new SearchFilter({
      value: searchphrase,
      label: this.filter?.label,
      column: this.filter?.column ?? ''
    });

    this.updateColumn.emit(updatedFilter);
  }
}
