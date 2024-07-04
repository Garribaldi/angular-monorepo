import { FilterColumnMapperPipe } from './filter-column-mapper.pipe';
import { ITableColumn } from '@local/shared/utils';
import { FilterColumn } from '../models/filter-column.model';

describe('FilterTypeMatcherPipe', () => {

  let pipe: FilterColumnMapperPipe;

  const tableColumnMock = {dataKey: 'testKey', label: 'Test Label'} as  ITableColumn;
  const expectedResult = {key: 'testKey', label: 'Test Label'} as FilterColumn;

  beforeEach(() => pipe = new FilterColumnMapperPipe());

  test('create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  test('convert checkbox to boolean', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'checkbox'}]);

    expect(result).toEqual([{...expectedResult, type: 'boolean'}]);
  });

  test('convert date to date', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'date'}]);

    expect(result).toEqual([{...expectedResult, type: 'date'}]);
  });

  test('convert text to search', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'text'}]);

    expect(result).toEqual([{...expectedResult, type: 'search'}]);
  });

  test('convert unspecified type to search', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'code'}]);

    expect(result).toEqual([{...expectedResult, type: 'search'}]);
  });

  test('convert text to check', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'text'}], ['testKey']);

    expect(result).toEqual([{...expectedResult, type: 'check'}]);
  });

  test('convert number to number', () => {
    const result = pipe.transform([{...tableColumnMock, dataType: 'number'}]);

    expect(result).toEqual([{...expectedResult, type: 'number'}]);
  });
});
