import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { filter, map, Subject, takeUntil } from "rxjs";
import { FilterColumnProperty, FilterDefinition, FilterTypes } from "../filter.model";

@Component({
  selector: 'local-angular-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<T extends { [Property in keyof T]: T[Property] extends FilterTypes ? FilterTypes : never }> implements OnInit, OnChanges, OnDestroy {

  @Input() unfilteredData: T[] | null = [];
  @Input() filterColumn: FilterColumnProperty = '';

  filteredData: T[] = [];
  filteredFilterValues: Array<FilterDefinition> = [];

  formGroup: FormGroup = new FormGroup({
    selectedFilter: new FormControl(''),
    filterSearch: new FormControl('')
  });

  private unfilteredFilterValues: Array<FilterDefinition> = [];
  private unsubscribe = new Subject<void>();

  @Output() dataFiltered = new EventEmitter<T[]>();

  ngOnInit() {
    this.listenSelectedFilter();
    this.listenFilterSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    const unfilteredData = changes['unfilteredData'].currentValue as T[];
    const filterColumn = changes['filterColumn'].currentValue as keyof T;

    const filterColumnValues = unfilteredData.map((data: T) => {
      const filterValue = data[filterColumn];
      return filterValue ?? `Error: Key '${String(filterColumn)}' does not exist in datasource`;
    });

    this.filteredData = unfilteredData;
    this.unfilteredFilterValues = [...new Set(filterColumnValues)].map(value => ({
      filterLabel: String(value),
      filterValue: value
    }))
    this.unfilteredFilterValues.unshift({filterLabel: 'All', filterValue: ''});

    this.clearSearchAndEmit();
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

          this.clearSearchAndEmit();
        }
      );
  }

  private listenFilterSearch(): void {
    this.formGroup.get('filterSearch')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        filter((search): search is string => search !== null),
        map(search => search.toLowerCase())
      )
      .subscribe(search => this.filteredFilterValues = this.unfilteredFilterValues.filter(filterDefinition =>
        filterDefinition.filterLabel.toLowerCase().indexOf(search) > -1)
      );
  }

  private clearSearchAndEmit(): void {
    this.clearFilterSearch();
    this.dataFiltered.emit(this.filteredData);
  }
}
