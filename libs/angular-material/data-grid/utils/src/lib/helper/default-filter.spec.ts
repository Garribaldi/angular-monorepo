import { getDefaultBooleanFilter, getDefaultDateFilter, getDefaultNumericFilter, getDefaultSearchFilter } from './default-filter';
import { DateFilter } from '../../models/filter/date-filter.model';
import { SearchFilter } from '../../models/filter/search-filter.model';
import { BooleanFilter } from '../../models/filter/boolean-filter.model';
import { NumericFilter } from '../../models/filter/numeric-filter.model';

describe('DefaultFilterUtils', () => {

  describe('getDefaultDateFilter()', () => {

    test('get default date filter', () => {
      const result = getDefaultDateFilter('column', 'label');

      expect(result).toBeInstanceOf(DateFilter);
      expect(result.id).toEqual('date_column');
    });
  });

  describe('getDefaultSearchFilter()', () => {

    test('get default search filter', () => {
      const result = getDefaultSearchFilter('column', 'label');

      expect(result).toBeInstanceOf(SearchFilter);
      expect(result.id).toEqual('search_column');
    });
  });

  describe('getDefaultBooleanFilter()', () => {

    test('get default boolean filter', () => {
      const result = getDefaultBooleanFilter('column', 'label');

      expect(result).toBeInstanceOf(BooleanFilter);
      expect(result.id).toEqual('boolean_column');
    });
  });

  describe('getDefaultNumericFilter()', () => {

    test('get default date filter', () => {

      const result = getDefaultNumericFilter('column', 'label', 0, 100);

      expect(result).toBeInstanceOf(NumericFilter);
      expect(result.id).toEqual('number_column');
    });
  });
});
