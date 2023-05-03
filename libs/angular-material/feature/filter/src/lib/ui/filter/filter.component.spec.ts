import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MockModule } from "ng-mocks";
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { SimpleChange } from "@angular/core";

type ComponentTestType = { name: string; value: string };
const testData: ComponentTestType[] = [
  {
    name: "Atlanta Hawks",
    value: "Atlanta"
  },
  {
    name: "Boston Celtics",
    value: "Boston"
  },
  {
    name: "Brooklyn Nets",
    value: "Brooklyn"
  }
];

describe('FilterComponent', () => {
  let component: FilterComponent<ComponentTestType>;
  let fixture: ComponentFixture<FilterComponent<ComponentTestType>>;

  const unfilteredData = new SimpleChange([], testData, true);
  const filterColumn = new SimpleChange(null, 'name', true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatSelectModule),
        MockModule(MatInputModule),
        MockModule(NgxMatSelectSearchModule),
        MockModule(ReactiveFormsModule)
      ],
      declarations: [FilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent<ComponentTestType>);
    component = fixture.componentInstance;

    component.unfilteredData = testData;
    component.filterColumn = 'name';

    fixture.detectChanges();

    component.ngOnChanges({unfilteredData, filterColumn});
  });

  it('should create', () => {
    const expectedFilterValues = testData.map(data => data.name);

    expect(component).toBeTruthy();
    expect(component.filteredData).toEqual(testData);
    expect(component.filteredFilterValues).toEqual(expectedFilterValues);
  });

  describe('search filter values', () => {

    let filterSearch: AbstractControl | null;

    beforeEach(() => filterSearch = component.formGroup.get('filterSearch'));

    test('search filter with result', fakeAsync(() => {
      filterSearch?.setValue('At');

      tick();

      expect(component.filteredFilterValues).toEqual([testData[0].name]);
    }));

    test('search filter without result', fakeAsync(() => {
      filterSearch?.setValue('Zu');

      tick();

      expect(component.filteredFilterValues).toEqual([]);
    }));
  });

  describe('filter list', () => {

    let selectedFilter: AbstractControl | null;

    beforeEach(() => selectedFilter = component.formGroup.get('selectedFilter'));

    test('filtered list with selected filter', fakeAsync(() => {
      selectedFilter?.setValue('Boston Celtics');

      tick();

      expect(component.filteredData).toEqual([testData[1]]);
    }));

    test('reset list with empty filter', fakeAsync(() => {
      selectedFilter?.setValue('Boston Celtics');

      tick();

      selectedFilter?.setValue('');

      tick();

      expect(component.filteredData).toEqual(component.unfilteredData);
    }));
  });

  describe('clearFilterSearch()', () => {

    let filterSearch: AbstractControl | null;

    beforeEach(() => filterSearch = component.formGroup.get('filterSearch'));

    test('unfiltered data equals filtered data', () => {
      filterSearch?.setValue('')

      component.clearFilterSearch();

      expect(component.formGroup.get('filterSearch')?.value).toEqual('');
      expect(component.filteredData).toEqual(component.unfilteredData);
    });
  });
});
