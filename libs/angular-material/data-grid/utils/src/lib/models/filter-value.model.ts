import { FilterDate } from './filter-date.model';
import { FilterNumericRange } from './filter-numeric-range.model';
import { Brand } from '@local/shared/utils';

export type ValidFilterString = Brand<string, 'FilterString'>;
export type ValidFilterDate = Brand<FilterDate, 'FilterDate'>;
export type ValidFilterNumber = Brand<FilterNumericRange, 'FilterNumber'>;
export type ValidFilterBoolean = Brand<boolean, 'FilterBoolean'>;

export type FilterValue =
  | ValidFilterString
  | ValidFilterNumber
  | ValidFilterDate
  | ValidFilterBoolean
  | null;
