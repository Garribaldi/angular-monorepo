import { IsFilterPipe } from './is-filter.pipe';
import { testSearchFilter } from '../../test-setup';

describe('IsFilterPipe', () => {

  let pipe: IsFilterPipe;

  beforeEach(() => pipe = new IsFilterPipe());

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('return Filter', () => {
    const result = pipe.transform(testSearchFilter);

    expect(result).toEqual(testSearchFilter);
  });

  test('return undefined if Array', () => {
    const result = pipe.transform([testSearchFilter]);

    expect(result).toBeUndefined();
  });

  test('return undefined if undefined', () => {
    const result = pipe.transform(undefined);

    expect(result).toBeUndefined();
  });
});
