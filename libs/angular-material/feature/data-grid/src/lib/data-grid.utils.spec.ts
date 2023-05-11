import { isFilterArray } from "./data-grid.utils";
import { FilterType } from "./models/filter-type.model";
import { Filter } from "./models/filter.model";

describe('Data grid utils', () => {

  describe('isFilterArray()', () => {

    const testFilter = {type: FilterType.CHECK_FILTER} as Filter;

    test('value is filter array', () => {
      const result = isFilterArray([testFilter]);

      expect(result).toBeTruthy();
    });

    test('value is filter', () => {
      const result = isFilterArray(testFilter);

      expect(result).toBeFalsy();
    });
  });
});
