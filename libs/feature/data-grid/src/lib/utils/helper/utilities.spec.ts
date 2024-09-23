import { escapeRegExp } from './utilities';

describe("Escape RegExp", () => {

  test('string with special characters', () => {
    const testString = 'Test (string1){string2}';

    const result = escapeRegExp(testString);

    expect(result).toEqual('Test \\(string1\\)\\{string2\\}');
  })
});
