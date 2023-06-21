import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FilterColumnProperty, FilterDefinition, FilterTypes } from "./filter.model";

@Component({
  selector: 'local-angular-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<
  T extends {
    [Property in keyof T]: T[Property] extends FilterTypes
      ? FilterTypes
      : never;
  }
> implements OnChanges {

  @Input() unfilteredData: T[] = [];
  @Input() filterColumn: FilterColumnProperty = '';

  filterValues: Array<FilterDefinition> = [];

  @Output() dataFiltered = new EventEmitter<T[]>();

  ngOnChanges(changes: SimpleChanges) {
    const unfilteredData = changes['unfilteredData'].currentValue as T[];
    const filterColumn = changes['filterColumn'].currentValue as keyof T;

    const filterColumnValues = unfilteredData.map((data: T) => {
      const filterValue = data[filterColumn];
      return (
        filterValue ??
        `Error: Key '${String(filterColumn)}' does not exist in datasource`
      );
    });

    this.filterValues = [...new Set(filterColumnValues)].map(
      (value) => ({
        filterLabel: String(value),
        filterValue: value,
      })
    );
    this.filterValues.unshift({
      filterLabel: 'All',
      filterValue: '',
    });

    this.dataFiltered.emit(unfilteredData);
  }

  filtered(filter: FilterTypes) {
    let filteredData: T[];

    if (!filter) {
      filteredData = this.unfilteredData;
    } else {
      filteredData = this.unfilteredData.filter(data => data[this.filterColumn as keyof T] === filter) ?? [];
    }

    this.dataFiltered.emit(filteredData);
  }
}
