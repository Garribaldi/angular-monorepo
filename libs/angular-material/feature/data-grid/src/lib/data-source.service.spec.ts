import { TestBed } from '@angular/core/testing';
import { DataSourceService } from './data-source.service';
import { CheckFilter } from "./models/check-filter.model";
import { DateFilter } from "./models/date-filter.model";
import moment from "moment";
import { FilterDate } from "./models/filter-date.model";
import { Filter } from "./models/filter.model";
import { firstValueFrom, skip, switchMap, take } from "rxjs";

type TestData = { checkColumn: string, dateColumn: Date };

const msDay = 86400000;
const yesterday = new Date(Date.now() - msDay);

describe('DataGridService', () => {
  let service: DataSourceService<TestData>;

  const testDataSource: TestData[] = [
    {checkColumn: 'test data 1', dateColumn: new Date()},
    {checkColumn: 'test data 2', dateColumn: new Date()},
    {checkColumn: 'test data 3', dateColumn: yesterday}
  ];

  const testCheckFilter = new CheckFilter({
    value: testDataSource[1].checkColumn,
    column: 'checkColumn',
    label: 'Check Label',
    hitCount: 1
  });
  const testDateFilter = new DateFilter({
    value: {from: moment(yesterday), to: moment(yesterday)} as FilterDate,
    column: 'dateColumn',
    label: 'Date Label'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceService<TestData>);
    service.dataSource = testDataSource;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('filter()', () => {
    let testGroupedFilter: Map<string, Filter[]>;

    beforeEach(() => testGroupedFilter = new Map<string, Filter[]>);

    it('should filter test data 2 by check filter', async () => {
      testGroupedFilter.set('checkColumn', [testCheckFilter]);

      service.filter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$.pipe(skip(1)));
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(expect.objectContaining(testDataSource[1]));
    });

    it('should filter test data 3 by date filter', async () => {
      testGroupedFilter.set('dateColumn', [testDateFilter]);

      service.filter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$.pipe(skip(1)));
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(expect.objectContaining(testDataSource[2]));
    });

    it('should return datasource id grouped filter is empty', async () => {
      service.filter(testGroupedFilter);

      const result = await firstValueFrom(service.filteredData$.pipe(skip(1)));
      expect(result.length).toEqual(3);
      expect(result).toEqual(testDataSource);
    });
  });

  describe('getCheckFilters()', () => {

    it('should generate check filter array from datasource', () => {
      const result = service.getCheckFilter('checkColumn', 'Check Label');

      expect(result.length).toEqual(3);
      expect(result[0].value).toEqual(testDataSource[0].checkColumn);
      expect(result[1].value).toEqual(testDataSource[1].checkColumn);
      expect(result[2].value).toEqual(testDataSource[2].checkColumn);
    });
  });

  describe('dataSourceChanged$', () => {

    it('should trigger change', (done) => {
      const newData = [...testDataSource,     {checkColumn: 'test data 4', dateColumn: new Date()}];

      service.dataSourceChanged$
        .pipe(
          take(1),
          switchMap(() => service.filteredData$.pipe(skip(1)))
        )
        .subscribe(filteredData => {
            expect(filteredData).toEqual(newData);
            done();
        });

      service.dataSource = newData;
    });
  });
});
