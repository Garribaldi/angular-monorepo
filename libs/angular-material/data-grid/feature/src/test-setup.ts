import 'jest-preset-angular/setup-jest';

const msDay = 86400000;
const yesterday = new Date(Date.now() - msDay);

export type TestData = { checkColumn: string; dateColumn: Date | string, searchColumn: string, booleanColumn: boolean, numericColumn: number };

export const testDataSource: TestData[] = [
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Teddy', booleanColumn: true, numericColumn: 1} as unknown as TestData,
  {checkColumn: undefined, dateColumn: new Date(), searchColumn: 'Moe', booleanColumn: true, numericColumn: 99} as unknown as TestData,
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Bob', booleanColumn: true, numericColumn: 35},
  {checkColumn: 'test data 1', dateColumn: new Date(), searchColumn: 'Louise', booleanColumn: false, numericColumn: 10},
  {checkColumn: 'test data 2', dateColumn: yesterday, searchColumn: 'Linda', booleanColumn: true, numericColumn: 30},
  {checkColumn: 'test data 3', dateColumn: '2013-04-02', searchColumn: 'Tina', booleanColumn: false, numericColumn: 16},
  {checkColumn: 'test data 4', dateColumn: 'yyyy', searchColumn: 'Gene', booleanColumn: false, numericColumn: 12}
];
