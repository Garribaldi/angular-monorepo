import { TestBed } from '@angular/core/testing';

import { SelectedFilterStateService } from './selected-filter-state.service';
import { DateFilter } from "./models/date-filter.model";
import moment from "moment";
import { CheckFilter } from "./models/check-filter.model";
import { firstValueFrom } from "rxjs";

describe('DataGridStateService', () => {
  let service: SelectedFilterStateService;

  const testDateFilter = new DateFilter({value: {from: moment(), to: moment()}, label: 'Date Label', column: 'dateColumn'});
  const testCheckFilter = new CheckFilter({value: 'Test Check', column: 'checkColumn', label: 'Check Label', hitCount: 1});

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedFilterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addFilter()', () => {

    it('should add filter to selected filter', async () => {
      service.addFilter(testCheckFilter);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });
  });

  describe('updateFilterByColumn()', () => {

    it('should update filter column', async () => {
      const updatedFilter = new DateFilter({value: {from: moment(), to: moment()}, label: 'Date Label updated', column: 'dateColumn'});
      service.addFilter(testDateFilter);

      service.updateFilterByColumn(updatedFilter, 'dateColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toEqual([updatedFilter]);
    });
  });

  describe('removeFilter()', () => {

    it('should remove filter from selected filter', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeFilter(testDateFilter);

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toBeUndefined();
      expect(result.get('checkColumn')).toEqual([testCheckFilter]);
    });
  });

  describe('removeAllFilter()', () => {

    it('should remove all filter from selected filter', async () => {
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

    it('should remove column from filter list', async () => {
      service.addFilter(testDateFilter);
      service.addFilter(testCheckFilter);

      service.removeFilterByColumn('checkColumn');

      const result = await firstValueFrom(service.selectedFilter$);
      expect(result.size).toEqual(1);
      expect(result.get('dateColumn')).toEqual([testDateFilter]);
      expect(result.get('checkColumn')).toBeUndefined();
    });
  });
});
