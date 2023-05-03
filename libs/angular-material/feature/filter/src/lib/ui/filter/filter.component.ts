import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { filter, Subject, takeUntil } from "rxjs";

type FilterType = string | number;

@Component({
  selector: 'local-angular-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<T extends { [Property in keyof T]: T[Property] extends FilterType ? FilterType : never }> implements OnInit, OnChanges, OnDestroy {

  @Input() unfilteredData: T[] | null = [];
  @Input() filterColumn = '';

  filteredData: T[] = [];
  filteredFilterValues: Array<FilterType> = [];

  formGroup: FormGroup = new FormGroup({
    selectedFilter: new FormControl(''),
    filterSearch: new FormControl('')
  });

  private unfilteredFilterValues: Array<FilterType> = [];
  private unsubscribe = new Subject<void>();

  @Output() dataFiltered = new EventEmitter<T[]>();

  ngOnInit() {
    this.listenSelectedFilter();
    this.listenFilterSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    const {unfilteredData, filterColumn} = changes;
    const filterColumnValues = (unfilteredData.currentValue as T[]).map((data: T) => {
      const filterValue = data[filterColumn.currentValue as keyof T];
      return filterValue ?? `Error: Key '${filterColumn.currentValue}' does not exist in datasource`;
    });

    this.filteredData = unfilteredData.currentValue as T[];
    this.unfilteredFilterValues = [...new Set(filterColumnValues)];

    this.clearFilterSearch();

    this.dataFiltered.emit(this.filteredData);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  clearFilterSearch(): void {
    this.formGroup.get('filterSearch')?.setValue('');
    this.filteredFilterValues = this.unfilteredFilterValues;
  }

  private listenSelectedFilter(): void {
    this.formGroup.get('selectedFilter')?.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        filter => {
          const unfiltered = this.unfilteredData ?? [];

          if (!filter) {
            this.filteredData = unfiltered;
          } else {
            this.filteredData = unfiltered.filter(data => data[this.filterColumn as keyof T] === filter) ?? [];
          }

          this.clearFilterSearch();

          this.dataFiltered.emit(this.filteredData);
        }
      );
  }

  private listenFilterSearch(): void {
    this.formGroup.get('filterSearch')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        filter((search): search is string => search !== null)
      )
      .subscribe(search => {
        this.filteredFilterValues = this.unfilteredFilterValues.filter(value => value.toString().toLowerCase().indexOf(search) > -1);
      });

  }
}
