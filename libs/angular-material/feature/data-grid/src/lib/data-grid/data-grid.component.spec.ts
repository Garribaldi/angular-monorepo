import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { MockComponent, MockProvider } from "ng-mocks";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { DataSourceService } from "../data-source.service";
import { of } from "rxjs";
import { DataGridChipsBarComponent } from "../data-grid-chips-bar/data-grid-chips-bar.component";
import { Filter } from "../models/filter.model";

type TestData = { column1: string, columns2: string, column3: string };

describe('DataGridComponent', () => {
  let component: DataGridComponent<TestData>;
  let fixture: ComponentFixture<DataGridComponent<TestData>>;

  let selectedFilterStateService: SelectedFilterStateService;
  let dataSourceService: DataSourceService<TestData>;

  let spyOnFiltered: jest.SpyInstance;

  const testDataSource: TestData[] = [{column1: 'test 1', columns2: 'test 2', column3: 'test 3'}];

  const testFilter = {id: 'test-filter-1'} as Filter;
  const testFilterGroup = new Map<string, Filter[]>().set('column1', [testFilter]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataGridComponent,
        MockComponent(DataGridChipsBarComponent)
      ],
      providers: [
        MockProvider(SelectedFilterStateService, {
          selectedFilter$: of(testFilterGroup),
          removeFilter: jest.fn(),
          removeAllFilters: jest.fn()
        }),
        MockProvider(DataSourceService<TestData>, {
          filter: jest.fn(),
          filteredData$: of(testDataSource)
        })
      ]
    }).compileComponents();

    jest.clearAllMocks();

    selectedFilterStateService = TestBed.inject(SelectedFilterStateService);
    dataSourceService = TestBed.inject(DataSourceService<TestData>);

    fixture = TestBed.createComponent(DataGridComponent<TestData>);

    component = fixture.componentInstance;
    component.dataSource = testDataSource;

    spyOnFiltered= jest.spyOn(component.filtered, 'next');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.groupedFilter).toEqual(testFilterGroup);
    expect(dataSourceService.filter).toHaveBeenCalledWith(testFilterGroup);
    expect(dataSourceService.dataSource).toEqual(testDataSource);
    expect(spyOnFiltered).toHaveBeenCalled();
  });

  describe('removeFilter()', () => {

    it('should remove single filter', () => {
      component.removeFilter(testFilter);

      expect(selectedFilterStateService.removeFilter).toHaveBeenCalledWith(testFilter);
    });
  });

  describe('removeAllFilter()', () => {

    it('should remove all filter', () => {
      component.removelAllFilter();

      expect(selectedFilterStateService.removeAllFilters).toHaveBeenCalled();
    });
  });
});
