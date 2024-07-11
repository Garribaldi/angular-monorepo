import { assertCannotReach } from "./utilities";

describe('Utilities', () => {

  describe('assertCannotReach', () => {
    enum TestEnum {
      first = 'First value',
      second = 'Second value',
      third = 'Third value'
    }

    const getEnumValue = (val: TestEnum): string => {
      switch (val) {
        case TestEnum.first:
          return 'first';
        case TestEnum.second:
          return 'second';
        case TestEnum.third:
          return 'third';
        default:
          return assertCannotReach(val);
      }
    }

    test('switch statement is exhausted', () => {
      const testValue = TestEnum.first;

      const result = getEnumValue(testValue);

      expect(result).toEqual('first');
    });
  });
});
