import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'local-angular-material-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<T extends { [key: string]: any }> implements OnInit, OnChanges {

  @ViewChild('inputFilter', {static: true}) inputFilter!: ElementRef<HTMLInputElement>;

  @Input() unfilteredData: T[] | null = [];
  @Input() filterColumn = '';

  filteredData: T[] = [];
  filteredFilterValues: Array<string | number> = [];

  formGroup: FormGroup = new FormGroup({
    selectedFilter: new FormControl("")
  });

  private unfilteredFilterValues: Array<string | number> = [];

  @Output() dataFiltered = new EventEmitter<T[]>();

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(
      changed => {
        const {selectedFilter} = changed;
        const unfiltered = this.unfilteredData ?? [];

        if (!selectedFilter) {
          this.filteredData = unfiltered;
        } else {
          this.filteredData = unfiltered.filter(data => data[this.filterColumn] === selectedFilter) ?? [];
        }

        this.clear();

        this.dataFiltered.emit(this.filteredData);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const {unfilteredData, filterColumn} = changes;
    const filterColumnValues = (unfilteredData.currentValue as T[]).map((data: T) => data[filterColumn.currentValue]);

    this.filteredData = unfilteredData.currentValue as T[];
    this.unfilteredFilterValues = [...new Set(filterColumnValues)];

    this.clear();

    this.dataFiltered.emit(this.filteredData);
  }

  lookup(target: EventTarget | null) {
    const searchPhrase = (target as HTMLInputElement).value.toLowerCase();

    this.filteredFilterValues = this.unfilteredFilterValues.filter(value => (value as string).toLowerCase().indexOf(searchPhrase) > -1);
  }

  clear(): void {
    this.inputFilter.nativeElement.value = '';
    this.filteredFilterValues = this.unfilteredFilterValues;
  }
}
