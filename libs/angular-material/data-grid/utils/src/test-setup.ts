// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
  }
};
import 'jest-preset-angular/setup-jest';
import { SearchFilter } from './lib/models/filter/search-filter.model';
import { CheckFilter } from './lib/models/filter/check-filter.model';
import { DateFilter } from './lib/models/filter/date-filter.model';
import { FilterDate } from './lib/models/filter-date.model';
import { BooleanFilter } from './lib/models/filter/boolean-filter.model';
import { NumericFilter } from './lib/models/filter/numeric-filter.model';
import moment from 'moment/moment';

const msDay = 86400000;
const yesterday = new Date(Date.now() - msDay);

export type TestData = { checkColumn: string; dateColumn: Date | string, searchColumn: string, booleanColumn: boolean, numericColumn: number };

export const testDataSource: TestData[] = [
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Bob', booleanColumn: true, numericColumn: 35},
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Louise', booleanColumn: false, numericColumn: 10},
  {checkColumn: 'test data 2', dateColumn: yesterday, searchColumn: 'Linda', booleanColumn: true, numericColumn: 30},
  {checkColumn: 'test data 3', dateColumn: '2013-04-02', searchColumn: 'Tina', booleanColumn: false, numericColumn: 16},
  {checkColumn: 'test data 4', dateColumn: 'yyyy', searchColumn: 'Gene', booleanColumn: false, numericColumn: 12},
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Teddy', booleanColumn: true, numericColumn: 1} as unknown as TestData,
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Moe', booleanColumn: true, numericColumn: 99} as unknown as TestData,
];

export const testSearchFilter = new SearchFilter({
    column: 'searchColumn',
    label: 'Search Label',
    value: 'Linda'
  }
);

export const testCheckFilter = new CheckFilter({
  value: testDataSource[1].checkColumn,
  column: 'checkColumn',
  label: 'Check Label',
  hitCount: 1
});

export const testBooleanFilter = new BooleanFilter({
  column: 'booleanColumn',
  label: 'Boolean Label',
  value: true
});

export const testDateFilter = new DateFilter({
  value: {from: moment(yesterday), to: moment(yesterday)} as FilterDate,
  column: 'dateColumn',
  label: 'Date Label'
});

export const testNumericFilter = new NumericFilter({
  column: 'numericColumn',
  label: 'Numeric Label',
  value: {
    min: 1,
    max: 20
  }
});
