import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';
import { testCheckFilter, TestData, testDateFilter } from '../../test-setup';
import { TranslateModule } from '@ngx-translate/core';
import { DataGridDateFilterComponent } from '../data-grid-date-filter/data-grid-date-filter.component';
import { DataGridCheckFilterComponent } from '../data-grid-check-filter/data-grid-check-filter.component';
import { DataGridSearchFilterComponent } from '../data-grid-search-filter/data-grid-search-filter.component';
import { DataGridBooleanFilterComponent } from '../data-grid-boolean-filter/data-grid-boolean-filter.component';
import { DataGridNumericFilterComponent } from '../data-grid-numeric-filter/data-grid-numeric-filter.component';
import { BooleanFilter, DataGridUtilsModule, DatasourceService, DateFilter, Filter, FilterType, NumericFilter, SearchFilter, SelectedFilterStateService } from '@local/angular-material/data-grid/utils';
import * as utils from '@local/shared/utils';

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent<TestData>;
  let fixture: ComponentFixture<DataGridColumnComponent<TestData>>;

  let selectedFilterService: SelectedFilterStateService;

  const currentColumn = 'test-column';

  const changeDataSource = new Subject<void>();
  const removedFilter = new Subject<Filter[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(TranslateModule),
        MockModule(DataGridUtilsModule)
      ],
      declarations: [
        DataGridColumnComponent,
        MockComponent(DataGridDateFilterComponent),
        MockComponent(DataGridCheckFilterComponent),
        MockComponent(DataGridSearchFilterComponent),
        MockComponent(DataGridBooleanFilterComponent),
        MockComponent(DataGridNumericFilterComponent)
      ],
      providers: [
        MockProvider(DatasourceService, {
          getCheckFilterForColumn: jest.fn().mockReturnValue(testCheckFilter),
          dataSourceChanged$: changeDataSource.asObservable(),
          getMinValue: () => 0,
          getMaxValue: () => 100
        }),
        MockProvider(SelectedFilterStateService, {
          removedFilter$: removedFilter.asObservable(),
          addFilter: jest.fn(),
          removeFilter: jest.fn(),
          removeFilterByColumn: jest.fn()
        })
      ]
    }).compileComponents();
    jest.clearAllMocks();

    selectedFilterService = TestBed.inject(SelectedFilterStateService);

    fixture = TestBed.createComponent(DataGridColumnComponent<TestData>);
    component = fixture.componentInstance;

    component.column = currentColumn;
    component.label = 'Test Label';
    component.type = 'date';

    fixture.detectChanges();
  });

  test('create component', () => {
    expect(component).toBeTruthy();
    expect(component.filter).toBeUndefined();
  });

  describe('dataSourceChanged$', () => {

    test('have valid check filter', () => {
      component.type = 'check';
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.filter).toEqual(testCheckFilter);
    });

    test('have valid date filter', () => {
      component.type = 'date';
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.filter).toBeInstanceOf(DateFilter);
      expect((component.filter as Filter).label).toEqual(component.label);
      expect((component.filter as Filter).column).toEqual(component.column);
    });

    test('have valid search filter', () => {
      component.type = 'search';
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.filter).toBeInstanceOf(SearchFilter);
      expect((component.filter as Filter).label).toEqual(component.label);
      expect((component.filter as Filter).column).toEqual(component.column);
    });

    test('have valid boolean filter', () => {
      component.type = 'boolean';
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.filter).toBeInstanceOf(BooleanFilter);
      expect((component.filter as Filter).label).toEqual(component.label);
      expect((component.filter as Filter).column).toEqual(component.column);
    });

    test('have valid numeric filter', () => {
      component.type = 'number';
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.filter).toBeInstanceOf(NumericFilter);
      expect(component.minValue).toEqual(0);
      expect(component.maxValue).toEqual(100);
      expect((component.filter as Filter).label).toEqual(component.label);
      expect((component.filter as Filter).column).toEqual(component.column);
    });

    test('invalid filter type', () => {
      const spyOnAssertCannotReach = jest.spyOn(utils, 'assertCannotReach');
      component.type = 'invalid' as FilterType;
      fixture.detectChanges();

      changeDataSource.next();
      expect(spyOnAssertCannotReach).toHaveBeenCalledWith('invalid');
    });
  });

  describe('removedFilter$', () => {

    test('do not remove filter if column does not match', () => {
      component.type = 'check';
      fixture.detectChanges();
      changeDataSource.next();

      removedFilter.next([testCheckFilter]);

      expect(component.removedFilter).toEqual([]);
    });

    test('remove filter from current column', () => {
      component.type = 'check';
      component.column = testCheckFilter.column;
      fixture.detectChanges();
      changeDataSource.next();

      removedFilter.next([testCheckFilter]);

      expect(component.removedFilter).toEqual([testCheckFilter]);
    });
  });

  describe('addFilter()', () => {

    let spyOnAddFilter: jest.SpyInstance;

    beforeEach(
      () => (spyOnAddFilter = jest.spyOn(selectedFilterService, 'addFilter'))
    );

    test('add filter', () => {
      component.addFilter(testDateFilter);

      expect(spyOnAddFilter).toHaveBeenCalledWith(testDateFilter);
    });
  });

  describe('removeFilter()', () => {

    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnRemoveFilter = jest.spyOn(selectedFilterService, 'removeFilter'))
    );

    test('remove filter', () => {
      component.removeFilter(testCheckFilter);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testCheckFilter);
    });
  });

  describe('removeFilterByColumn()', () => {

    let spyOnRemoveFilterByColumn: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnRemoveFilterByColumn = jest.spyOn(selectedFilterService, 'removeFilterByColumn'))
    );

    test('remove filter for current column', () => {
      component.removeFilterByColumn();

      expect(spyOnRemoveFilterByColumn).toHaveBeenCalledWith(component.column);
    });
  });

  describe('updateFilterByColumn()', () => {

    let spyOnUpdateFilterByColumn: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnUpdateFilterByColumn = jest.spyOn(selectedFilterService, 'updateFilterByColumn'))
    );

    test('update filter for current column', () => {
      component.updateFilterByColumn(testDateFilter);

      expect(spyOnUpdateFilterByColumn).toHaveBeenCalledWith(
        testDateFilter,
        component.column
      );
    });
  });
});
