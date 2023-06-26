import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MockComponent } from 'ng-mocks';
import { SingleSelectComponent } from "./single-select/single-select.component";
import { SimpleChange } from "@angular/core";


type ComponentTestType = { name: string; value: string };

describe('FilterComponent', () => {

  let component: FilterComponent<ComponentTestType>;
  let fixture: ComponentFixture<FilterComponent<ComponentTestType>>;

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


  describe('filtered()', () => {
    let spyOnDataFiltered: jest.SpyInstance;

    beforeEach(() => spyOnDataFiltered = jest.spyOn(component.dataFiltered, 'emit'));

    test('find hit in datasource', () => {
      const filterValue = 'Boston Celtics';

      component.filtered(filterValue);

      expect(spyOnDataFiltered).toHaveBeenCalledWith([testData[1]]);
    });

    test('no hits found in datasource', () => {
      const filterValue = 'Homer Simpson';

      component.filtered(filterValue);

      expect(spyOnDataFiltered).toHaveBeenCalledWith([]);
    });

    test('empty search resets filtered datasource', () => {
      const filterValue = '';

      component.filtered(filterValue);

      expect(spyOnDataFiltered).toHaveBeenCalledWith(testData);
    });
  });
});
