import { TestBed } from '@angular/core/testing';
import { DatasourceService } from './datasource.service';
import { Filter } from '../../models/filter/filter.model';
import { firstValueFrom, switchMap, take } from 'rxjs';
import { testBooleanFilter, testCheckFilter, TestData, testDataSource, testDateFilter, testNumericFilter, testSearchFilter } from '../../../test-setup';
import { CheckFilter } from '../../models/filter/check-filter.model';


describe('DataSourceService', () => {
  let service: DatasourceService<TestData>;

  const indexedTestDatasource = testDataSource.map((data, index) => ({...data, _datasourceIndex: index}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatasourceService
      ]
    });
    service = TestBed.inject(DatasourceService<TestData>);

    service.dataSource = testDataSource;
  });

  test('create service', () => {
    expect(service).toBeTruthy();
  });

  describe('applyFilter()', () => {

    let testGroupedFilter: Map<string, Filter[]>;

    beforeEach(() => (testGroupedFilter = new Map<string, Filter[]>()));

    test('filter by search filter', async () => {
      testGroupedFilter.set('searchColumn', [testSearchFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[2]]);
    });

    test('filter by check filter', async () => {
      testGroupedFilter.set('checkColumn', [testCheckFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[0], indexedTestDatasource[1]]);
    });

    test('filter by check filter, remove duplicates', async () => {
      testGroupedFilter.set('checkColumn', [testCheckFilter, testCheckFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[0], indexedTestDatasource[1]]);
    });

    test('filter by check filter, unknown value', async () => {
      const unknownValueFilter = new CheckFilter({value: '', label: 'Check Label', hitCount: 2, column: 'checkColumn'})
      testGroupedFilter.set('checkColumn', [unknownValueFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[5], indexedTestDatasource[6]]);
    });

    test('filter by date filter', async () => {
      testGroupedFilter.set('dateColumn', [testDateFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[2]]);
    });

    test('filter by boolean filter', async () => {
      testGroupedFilter.set('booleanColumn', [testBooleanFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual([indexedTestDatasource[0], indexedTestDatasource[2], indexedTestDatasource[5], indexedTestDatasource[6]]);
    });

    test('filter by numeric filter', async () => {
      testGroupedFilter.set('numericColumn', [testNumericFilter]);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom((service.filteredData$));
      expect(result).toEqual([indexedTestDatasource[1], indexedTestDatasource[3], indexedTestDatasource[4], indexedTestDatasource[5]]);
    });

    test('no column filter available', async () => {
      testGroupedFilter.set('searchColumn', []);

      service.applyFilter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$);
      expect(result).toEqual(indexedTestDatasource);
    });
  });

  describe('getCheckFilterForColumn()', () => {

    test('generate check filter array from datasource', () => {
      service.dataSource = testDataSource.filter(filter => !!filter.checkColumn);
      const result = service.getCheckFilterForColumn('checkColumn', 'Check Label');

      expect(result.map(filter => filter.displayValue)).toEqual(['test data 1', 'test data 2', 'test data 3', 'test data 4']);
    });

    test('generate check filter with undefined values', () => {
      const result = service.getCheckFilterForColumn('checkColumn', 'Check Label');

      expect(result.map(filter => filter.displayValue)).toEqual(['ustay.shared.form.data-grid.captions.unknown', 'test data 1', 'test data 2', 'test data 3', 'test data 4']);
    });
  });

  describe('getMinValue()', () => {

    test('get min value', () => {
      const result = service.getMinValue('numericColumn');

      expect(result).toEqual(1);
    });
  });

  describe('getMaxValue()', () => {

    test('get max value', () => {
      const result = service.getMaxValue('numericColumn');

      expect(result).toEqual(99);
    });
  });

  describe('dataSourceChanged$', () => {

    test('trigger change', (done) => {
      const newColumn: TestData = {checkColumn: 'test data 5', dateColumn: new Date(), searchColumn: 'Gale', booleanColumn: false, numericColumn: 0};

      service.dataSource = [...testDataSource, newColumn];

      service.dataSourceChanged$
        .pipe(
          take(1),
          switchMap(() => service.filteredData$)
        )
        .subscribe((filteredData) => {
          expect(filteredData).toEqual([...indexedTestDatasource, {...newColumn, _datasourceIndex: 7}]);
          done();
        });
    });
  });

  describe('filteredData$', () => {

    test('get filtered data', async () => {
      const result = await firstValueFrom(service.filteredData$);

      expect(result).toEqual(indexedTestDatasource);
    });
  });
});
