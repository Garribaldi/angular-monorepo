import moment from 'moment/moment';
import { FilterDate } from '../models/filter-date.model';

/**
 * Provide a string value and a regular expression.
 *
 * Returns _true_ if a match is found, otherwise _false_.
 *
 * @param {string} columnValue
 * @param {RegExp} matcher
 * @return {boolean}
 */
export const filterByRegExp = (columnValue: string, matcher: RegExp): boolean => {
  return !!RegExp(matcher).exec(columnValue);
};

/**
 * Returns _true_ if columnValue is between from and to (provided in dateRange), otherwise _false_.
 *
 * If any of them is missing (either from or to), only one point in time is taken into account.
 *
 * @param {Date | string | number} columnValue
 * @param {FilterDate} dateRange
 * @return {boolean}
 */
export const filterByDate = (columnValue: Date | string | number, dateRange: FilterDate): boolean => {
  const {from, to} = dateRange;

  if (from && to) {
    return moment(columnValue).isBetween(from, to, 'days', '[]');
  }

  if (!from && to) {
    return moment(columnValue).isSameOrBefore(to, 'days');
  }

  if (from && !to) {
    return moment(columnValue).isSameOrAfter(from, 'days');
  }

  return true;
};

export const filterByBoolean = (columnValue: boolean, filterValue: boolean): boolean => {
  return columnValue === filterValue;
};
