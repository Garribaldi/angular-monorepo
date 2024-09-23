import { isNumeric } from './type-guards';

describe('Type Guards', () => {

  describe('isNumeric()', () => {

    test('value is numeric', () => {
      const testValue = 50;

      const result = isNumeric(testValue);

      expect(result).toBeTruthy();
    });

    test('value is no object', () => {
      const testValue = 'testValue';

      const result = isNumeric(testValue);

      expect(result).toBeFalsy();
    });
  });
});
