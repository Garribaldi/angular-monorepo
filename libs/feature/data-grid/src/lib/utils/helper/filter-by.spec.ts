import { filterByBoolean, filterByDate, filterByRegExp } from './filter-by';
import moment from 'moment';

describe('FilterByUtils', () => {

  describe('filterByRegExp()', () => {

    test('match found', () => {
      const result = filterByRegExp('TestValue', /(Test)/gi);

      expect(result).toBeTruthy();
    });

    test('no match found', () => {
      const result = filterByRegExp('TestValue', /(Nothing)/gi);

      expect(result).toBeFalsy();
    });
  });

  describe('filterByDate()', () => {

    test('match found', () => {
      const result = filterByDate('2023-05-05', {from: moment('2023-04-01'), to: moment('2023-06-01')});

      expect(result).toBeTruthy();
    });

    test('no match found', () => {
      const result = filterByDate('2023-07-05', {from: moment('2023-04-01'), to: moment('2023-06-01')});

      expect(result).toBeFalsy();
    });

    test('from date missing', () => {
      const result = filterByDate('2023-05-05', {from: null, to: moment('2023-06-01')});

      expect(result).toBeTruthy();
    });

    test('to date missing', () => {
      const result = filterByDate('2023-07-05', {from: moment('2023-04-01'), to: null});

      expect(result).toBeTruthy();
    });

    test('from and to date missing', () => {
      const result = filterByDate('2023-07-05', {from: null, to: null});

      expect(result).toBeTruthy();
    });
  });

  describe('filterByBoolean()', () => {

    test('match found', () => {
      const result = filterByBoolean(true, true);

      expect(result).toBeTruthy();
    });

    test('no match found', () => {
      const result = filterByBoolean(true, false);

      expect(result).toBeFalsy();
    });
  });
});
