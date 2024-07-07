import { IsFilterArrayPipe } from './is-filter-array.pipe';
import { testSearchFilter } from '../../test-setup';

describe('IsFilterArrayPipe', () => {

  let pipe: IsFilterArrayPipe;

  beforeEach(() => pipe = new IsFilterArrayPipe());

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('return Filter array', () => {
    const result = pipe.transform([testSearchFilter]);

    expect(result).toEqual([testSearchFilter]);
  });

  test('return empty array if single Filter', () => {
    const result = pipe.transform(testSearchFilter);

    expect(result).toEqual([]);
  });

  test('return empty array if undefined', () => {
    const result = pipe.transform(undefined);

    expect(result).toEqual([]);
  });
});
