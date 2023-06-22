import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SingleSelectComponent } from './single-select.component';
import { FilterDefinition } from "../filter.model";
import { SimpleChange } from "@angular/core";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";


describe('FilterComponent', () => {
  let component: SingleSelectComponent;
  let fixture: ComponentFixture<SingleSelectComponent>;

  const testData: Array<FilterDefinition> = [
    {
      filterLabel: 'Atlanta Hawks',
      filterValue: 'Atlanta',
    },
    {
      filterLabel: 'Boston Celtics',
      filterValue: 'Boston',
    },
    {
      filterLabel: 'Brooklyn Nets',
      filterValue: 'Brooklyn',
    },
  ];

  const unfilteredFilterValues = new SimpleChange([], testData, true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatSelectModule),
        MockModule(NgxMatSelectSearchModule),
        MockModule(ReactiveFormsModule)
      ],
      declarations: [SingleSelectComponent],
    }).compileComponents();

    jest.clearAllMocks();

    fixture = TestBed.createComponent(SingleSelectComponent);
    component = fixture.componentInstance;

    component.unfilteredFilterValues = testData;
    component.ngOnChanges({unfilteredFilterValues});

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
    expect(component.filteredFilterValues.length).toEqual(3);
    expect(component.filteredFilterValues[0].filterLabel).toEqual(testData[0].filterLabel);
  });

  describe('search filter values', () => {
    let filterSearch: AbstractControl | null;

    beforeEach(() => (filterSearch = component.formGroup.get('filterSearch')));

    test('search filter with result', fakeAsync(() => {
      const expectedResult: Array<FilterDefinition> = [{
        filterLabel: testData[0].filterLabel,
        filterValue: testData[0].filterValue
      }];

      filterSearch?.setValue('At');
      tick();

      expect(component.filteredFilterValues).toEqual(expectedResult);
    }));

    test('search filter without result', fakeAsync(() => {
      filterSearch?.setValue('Zu');
      tick();

      expect(component.filteredFilterValues).toEqual([]);
    }));
  });

  describe('filter list', () => {
    let selectedFilter: AbstractControl | null;
    let spyOnSelectedValue: jest.SpyInstance;

    const testValue = 'Boston Celtics';

    beforeEach(() => {
      selectedFilter = component.formGroup.get('selectedFilter');
      spyOnSelectedValue = jest.spyOn(component.selectedValue, 'emit');
    });

    test('filtered list with selected filter', fakeAsync(() => {
      selectedFilter?.setValue(testValue);

      tick();

      expect(spyOnSelectedValue).toHaveBeenCalledWith(testValue);
    }));

    test('reset list with empty filter', fakeAsync(() => {
      selectedFilter?.setValue(testValue);

      tick();

      selectedFilter?.setValue('');

      tick();

      expect(spyOnSelectedValue).toHaveBeenCalledTimes(2);
      expect(spyOnSelectedValue).toHaveBeenCalledWith(testValue);
      expect(spyOnSelectedValue).toHaveBeenCalledWith('');
    }));
  });
});
