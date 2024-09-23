import { Filter } from '../models/filter/filter.model';
import { SearchFilter } from '../models/filter/search-filter.model';
import { DateFilter } from '../models/filter/date-filter.model';
import { BooleanFilter } from '../models/filter/boolean-filter.model';
import { NumericFilter } from '../models/filter/numeric-filter.model';

export const getDefaultDateFilter = (column: string, label: string): Filter => {
  return new DateFilter({
    value: {from: null, to: null},
    column,
    label
  });
};

export const getDefaultSearchFilter = (column: string, label: string, value: string | null = null): Filter => {
  return new SearchFilter({
    value,
    column,
    label
  });
};

export const getDefaultBooleanFilter = (column: string, label: string): Filter => {
  return new BooleanFilter({
    value: null,
    column,
    label
  });
};

export const getDefaultNumericFilter = (column: string, label: string, min: number, max: number): Filter => {
  return new NumericFilter({
    value: {min, max},
    column,
    label
  });
};
