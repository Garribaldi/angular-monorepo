import { ComponentFixture, fakeAsync, TestBed, tick, } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MockComponent } from 'ng-mocks';
import { SingleSelectComponent } from "./single-select/single-select.component";
import { SimpleChange } from "@angular/core";
import { AbstractControl } from "@angular/forms";


type ComponentTestType = { name: string; value: string };
const testData: ComponentTestType[] = [
  {
    name: 'Atlanta Hawks',
    value: 'Atlanta',
  },
  {
    name: 'Boston Celtics',
    value: 'Boston',
  },
  {
    name: 'Brooklyn Nets',
    value: 'Brooklyn',
  },
];
describe('FilterComponent', () => {

  let component: FilterComponent<ComponentTestType>;
  let fixture: ComponentFixture<FilterComponent<ComponentTestType>>;

  const unfilteredData = new SimpleChange([], testData, true);
  const filterColumn = new SimpleChange(null, 'name', true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FilterComponent,
        MockComponent(SingleSelectComponent)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent<ComponentTestType>);
    component = fixture.componentInstance;

    component.unfilteredData = testData;
    component.filterColumn = 'name';

    component.ngOnChanges({unfilteredData, filterColumn});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  describe('filter list', () => {
    let selectedFilter: AbstractControl | null;

    beforeEach(
      () => (selectedFilter = component.formGroup.get('selectedFilter'))
    );

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

    beforeEach(() => (filterSearch = component.formGroup.get('filterSearch')));

    test('unfiltered data equals filtered data', () => {
      filterSearch?.setValue('');

      component.clearFilterSearch();

      expect(component.formGroup.get('filterSearch')?.value).toEqual('');
      expect(component.filteredData).toEqual(component.unfilteredData);
    });
  });
});
