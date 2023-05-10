import { isDefined, isInEnum } from "./type-guards";

describe('Type Guards', () => {

  describe('isEnum', () => {
    enum TestEnum {
      first = 'First value',
      second = 'Second value',
      third = 'Third value'
    }

    test('value is in enum', () => {
      const testValue = 'First value';

      const result = isInEnum(testValue, TestEnum) ? testValue : undefined;

      expect(result).toBeTruthy();
      expect(result).toEqual(TestEnum.first);
    });

    test('value is not in enum', () => {
      const testValue = 'Fourth value';

      const result = isInEnum(testValue, TestEnum) ? testValue : undefined;

      expect(result).toBeUndefined();
    });
  });

  describe('isTypeOrUndefined', () => {

    const defaultValue = 'default';

    test('value is string', () => {
      const testValue = '100';

      const result = isDefined(testValue) ? testValue : defaultValue;

      expect(result).toBeDefined();
      expect(result).toEqual(testValue);
      expect(typeof result).toEqual('string');
    });

    test('value is number', () => {
      const testValue = 100;

      const result = isDefined(testValue) ? testValue : defaultValue;

      expect(result).toBeDefined();
      expect(result).toEqual(testValue);
      expect(typeof result).toEqual('number');
    });

    test('value is object', () => {
      const testValue = {value: '100'};

      const result = isDefined(testValue) ? testValue : defaultValue;

      expect(result).toBeDefined();
      expect(result).toEqual(testValue);
      expect(typeof result).toEqual('object');
    });

    test('value is undefined', () => {
      const testValue = undefined;

      const result = isDefined(testValue) ? testValue : defaultValue;

      expect(result).toBeDefined();
      expect(result).toEqual('default');
      expect(typeof result).toEqual('string');
    });
  });
});
