import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';
import { MockComponents, MockDirective, MockPipe, MockProvider, } from 'ng-mocks';
import { DataSourceService } from '../../../../data-access/src/lib/data-source.service';
import { FilterType } from '../../../../data-access/src/lib/models/filter-type.model';
import {
  DataGridCheckFilterComponent
} from '../../../../ui/src/lib/data-grid-check-filter/data-grid-check-filter.component';
import {
  DataGridDateFilterComponent
} from '../../../../ui/src/lib/data-grid-date-filter/data-grid-date-filter.component';
import { Filter } from '../../../../data-access/src/lib/models/filter.model';
import { Subject } from 'rxjs';
import { CypressSelectorDirective, ToSlashCasePipe } from '@local/shared/utils';
import { SelectedFilterStateService } from '../../../../data-access/src/lib/selected-filter-state.service';
import { DateFilter } from '../../../../data-access/src/lib/models/date-filter.model';

type TestData = { name: string };

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent<TestData>;
  let fixture: ComponentFixture<DataGridColumnComponent<TestData>>;

  let selectedFilterServicec: SelectedFilterStateService;

  const currentColumn = 'test-column';

  const testCheckFilter: Filter[] = [
    {
      id: '12345',
      column: currentColumn,
      type: FilterType.CHECK_FILTER,
      value: 'Test Value',
      displayValue: 'Test Value',
      label: 'Check Label',
      hitCount: 2,
    } as Filter,
  ];

  const testDateFilter = new DateFilter({
    value: { from: null, to: null },
    label: 'Date Label',
    column: currentColumn,
  });

  const changeDataSource = new Subject<void>();
  const removedFilter = new Subject<Filter[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataGridColumnComponent,
        MockComponents(
          DataGridCheckFilterComponent,
          DataGridDateFilterComponent
        ),
        MockPipe(ToSlashCasePipe),
        MockDirective(CypressSelectorDirective),
      ],
      providers: [
        MockProvider(DataSourceService, {
          getCheckFilter: jest.fn().mockReturnValue(testCheckFilter),
          dataSourceChanged$: changeDataSource.asObservable(),
        }),
        MockProvider(SelectedFilterStateService, {
          removedFilter$: removedFilter.asObservable(),
          addFilter: jest.fn(),
          removeFilter: jest.fn(),
          removeFilterByColumn: jest.fn(),
        }),
      ],
    }).compileComponents();

    selectedFilterServicec = TestBed.inject(SelectedFilterStateService);

    fixture = TestBed.createComponent(DataGridColumnComponent<TestData>);
    component = fixture.componentInstance;

    component.column = currentColumn;
    component.label = 'Test Label';
    component.type = FilterType.DATE_FILTER;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component.checkFilter).toEqual([]);
    expect(component.dateFilter).toBeUndefined();
  });

  describe('dataSourceChanged$', () => {
    it('should have valid check filter', () => {
      component.type = FilterType.CHECK_FILTER;
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.checkFilter).toEqual(testCheckFilter);
      expect(component.dateFilter).toBeUndefined();
    });

    it('should have valid date filter', () => {
      component.type = FilterType.DATE_FILTER;
      fixture.detectChanges();

      changeDataSource.next();

      expect(component.checkFilter).toEqual([]);
      expect(component.dateFilter).toBeInstanceOf(DateFilter);
      expect(component.dateFilter?.label).toEqual(component.label);
      expect(component.dateFilter?.column).toEqual(component.column);
    });
  });

  describe('removedFilter$', () => {
    it('should remove filter from current column', () => {
      component.type = FilterType.CHECK_FILTER;
      fixture.detectChanges();
      changeDataSource.next();

      removedFilter.next(testCheckFilter);

      expect(component.removedFilter).toEqual(testCheckFilter);
    });
  });

  describe('addFilter()', () => {
    let spyOnAddFilter: jest.SpyInstance;

    beforeEach(
      () => (spyOnAddFilter = jest.spyOn(selectedFilterServicec, 'addFilter'))
    );

    it('should add filter', () => {
      component.addFilter(testDateFilter);

      expect(spyOnAddFilter).toHaveBeenCalledWith(testDateFilter);
    });
  });

  describe('removeFilter()', () => {
    let spyOnRemoveFilter: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnRemoveFilter = jest.spyOn(selectedFilterServicec, 'removeFilter'))
    );

    it('should remove filter', () => {
      component.removeFilter(testCheckFilter[0]);

      expect(spyOnRemoveFilter).toHaveBeenCalledWith(testCheckFilter[0]);
    });
  });

  describe('removeFilterByColumn()', () => {
    let spyOnRemoveFilterByColumn: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnRemoveFilterByColumn = jest.spyOn(
          selectedFilterServicec,
          'removeFilterByColumn'
        ))
    );

    it('should remove filter for current column', () => {
      component.removeFilterByColumn();

      expect(spyOnRemoveFilterByColumn).toHaveBeenCalledWith(component.column);
    });
  });

  describe('updateFilterByColumn()', () => {
    let spyOnUpdateFilterByColumn: jest.SpyInstance;

    beforeEach(
      () =>
        (spyOnUpdateFilterByColumn = jest.spyOn(
          selectedFilterServicec,
          'updateFilterByColumn'
        ))
    );

    it('should update filter for current column', () => {
      component.updateFilterByColumn(testDateFilter);

      expect(spyOnUpdateFilterByColumn).toHaveBeenCalledWith(
        testDateFilter,
        component.column
      );
    });
  });
});
