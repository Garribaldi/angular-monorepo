import 'jest-preset-angular/setup-jest';
import { CheckFilter, DateFilter, FilterDate, SearchFilter } from '@local/angular-material/data-grid/utils';
import moment from 'moment/moment';

const msDay = 86400000;
const yesterday = new Date(Date.now() - msDay);

export const testSearchFilter = new SearchFilter({
    column: 'searchColumn',
    label: 'Search Label',
    value: 'Linda'
  }
);

jest.mock('@local/shared/utils', () => {
  const original = jest.requireActual('@local/shared/utils');
  return {
    ...original,
    assertCannotReach: jest.fn()
  };
});

export type TestData = { checkColumn: string; dateColumn: Date | string, searchColumn: string, booleanColumn: boolean, numericColumn: number };

export const testDataSource: TestData[] = [
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Bob', booleanColumn: true, numericColumn: 35},
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Louise', booleanColumn: false, numericColumn: 10},
  {checkColumn: 'test data 2', dateColumn: yesterday, searchColumn: 'Linda', booleanColumn: true, numericColumn: 30},
  {checkColumn: 'test data 3', dateColumn: '2013-04-02', searchColumn: 'Tina', booleanColumn: false, numericColumn: 16},
  {checkColumn: 'test data 4', dateColumn: 'yyyy', searchColumn: 'Gene', booleanColumn: false, numericColumn: 12},
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Teddy', booleanColumn: true, numericColumn: 1} as unknown as TestData,
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Moe', booleanColumn: true, numericColumn: 99} as unknown as TestData
];

export const testDateFilter = new DateFilter({
  value: {from: moment(yesterday), to: moment(yesterday)} as FilterDate,
  column: 'dateColumn',
  label: 'Date Label'
});

export const testCheckFilter = new CheckFilter({
  value: testDataSource[1].checkColumn,
  column: 'checkColumn',
  label: 'Check Label',
  hitCount: 1
});
