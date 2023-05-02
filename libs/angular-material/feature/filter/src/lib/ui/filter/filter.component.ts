import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterDefinition } from "./filter-definition.model";

@Component({
  selector: 'local-angular-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<T extends { [key: string]: any }> implements OnInit, OnChanges {

  @Input() unfilteredData: T[] | null = [];
  @Input() filterDefinition: FilterDefinition = {filterLabel: '', filterColumn: ''};

  filteredData: T[] = [];
  filterValues: Array<unknown> = [];

  formGroup: FormGroup = new FormGroup({
    selectedFilter: new FormControl("")
  });

  @Output() dataFiltered = new EventEmitter<T[]>();

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(
      changed => {
        const {selectedFilter} = changed;
        const unfiltered = this.unfilteredData ?? [];

        if (!selectedFilter) {
          this.filteredData = unfiltered;
        } else {
          this.filteredData = unfiltered.filter(data => data[this.filterDefinition.filterColumn] === selectedFilter) ?? [];
        }

        this.dataFiltered.emit(this.filteredData);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const {unfilteredData, filterDefinition} = changes;
    const filterColumnValues = unfilteredData.currentValue.map((data: T) => data[filterDefinition.currentValue.filterColumn]);

    this.filteredData = unfilteredData.currentValue;
    this.filterValues = [...new Set(filterColumnValues)];

    this.dataFiltered.emit(this.filteredData);
  }
}
