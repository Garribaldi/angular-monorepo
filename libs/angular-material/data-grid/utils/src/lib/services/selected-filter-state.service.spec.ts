import { TestBed } from '@angular/core/testing';
import { SelectedFilterStateService } from './selected-filter-state.service';
import { DateFilter } from '../../models/filter/date-filter.model';
import * as moment from 'moment/moment';
import { firstValueFrom } from 'rxjs';
import { testCheckFilter, testDateFilter } from '../../../test-setup';
import { CheckFilter } from '../../models/filter/check-filter.model';


describe('SelectedFilterStateService', () => {
  let service: SelectedFilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SelectedFilterStateService
      ]
    });
    service = TestBed.inject(SelectedFilterStateService);
  });
  jest.clearAllMocks();

  test('create service', () => {
    expect(service).toBeTruthy();
  });

  describe('addFilter()', () => {

    beforeEach(() => service.addFilter(testCheckFilter));

    test('add single filter to selected filter', async () => {
      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });

    test('add filter array to selected filter', async () => {
      service.addFilter([testCheckFilter]);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });
  });

  describe('updateFilterByColumn()', () => {

    test('update single filter by column', async () => {
      const updatedFilter = new DateFilter({
        value: {from: moment(), to: moment()},
        label: 'Date Label updated',
        column: 'dateColumn'
      });
      service.addFilter(testDateFilter);

      service.updateFilterByColumn(updatedFilter, 'dateColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toEqual([updatedFilter]);
    });

    test('update filter array by column', async () => {
      const updatedFilter = new CheckFilter({
        value: 'test data 3',
        column: 'checkColumn',
        label: 'Check Label Updated',
        hitCount: 1
      });
      service.addFilter(testCheckFilter);

      service.updateFilterByColumn([updatedFilter], 'checkColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('checkColumn')).toEqual([updatedFilter]);
    });
  });

  describe('removeFilter()', () => {

    test('remove filter from selected filter', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeFilter(testDateFilter);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toBeUndefined();
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });

    test('remove single filter from check filter array', async () => {
      const testCheckFilter2 = new CheckFilter({
        value: '',
        column: testCheckFilter.column,
        label: testCheckFilter.label,
        hitCount: 1
      });
      service.addFilter(testCheckFilter);
      service.addFilter(testCheckFilter2);

      service.removeFilter(testCheckFilter);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('checkColumn')).toEqual([testCheckFilter2]);
    });

    test('filter list is empty, nothing to remove', async () => {
      service.removeFilter([testDateFilter]);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(0);
    });
  });

  describe('removeAllFilter()', () => {

    test('remove all filter from selected filter', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeAllFilter();

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(0);
      expect(result.get('dateColumn')).toBeUndefined();
      expect(result.get('checkColumn')).toBeUndefined();
    });
  });

  describe('removeFilterByColumn()', () => {

    test('remove column from filter list', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeFilterByColumn('checkColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toEqual([testDateFilter]);
      expect(result.get('checkColumn')).toBeUndefined();
    });

    test('column not in filter list', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeFilterByColumn('searchColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(2);
      expect(result.get('dateColumn')).toEqual([testDateFilter]);
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });
  });
});
