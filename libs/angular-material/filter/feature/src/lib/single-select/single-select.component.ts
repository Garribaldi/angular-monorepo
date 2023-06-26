import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilterDefinition, FilterTypes } from "../filter.model";
import { FormControl, FormGroup } from "@angular/forms";
import { filter, map, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'local-angular-material-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit, OnChanges, OnDestroy {

  @Input() unfilteredFilterValues: Array<FilterDefinition> = [];

  formGroup: FormGroup = new FormGroup({
    selectedFilter: new FormControl(''),
    filterSearch: new FormControl(''),
  });

  filteredFilterValues: Array<FilterDefinition> = [];

  private unsubscribe = new Subject<void>();

  @Output() selectedValue = new EventEmitter<FilterTypes>();

  ngOnInit() {
    this.listenSelectedFilter();
    this.listenFilterSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    const unfilteredFilterValues = changes['unfilteredFilterValues'].currentValue as  Array<FilterDefinition>;

    if (unfilteredFilterValues && unfilteredFilterValues.length) {
      this.filteredFilterValues = [...unfilteredFilterValues];
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private listenSelectedFilter(): void {
    this.formGroup.get('selectedFilter')?.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(selectedFilter => this.selectedValue.emit(selectedFilter));
  }

  private listenFilterSearch(): void {
    this.formGroup.get('filterSearch')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        filter((search): search is string => search !== null),
        map(search => search.toLowerCase())
      )
      .subscribe(search =>
        this.filteredFilterValues = this.unfilteredFilterValues.filter(
          filterDefinition => filterDefinition.filterLabel.toLowerCase().indexOf(search) > -1
        )
      );
  }
}
