import { Moment } from "moment";
import { Brand } from "@local/shared/data-access";

export enum FilterType {
  CHECK_FILTER,
  DATE_FILTER
}

export type FilterDate = {
  from?: Moment | null;
  to?: Moment | null;
}

export type ValidFilterDate = Brand<FilterDate, 'FilterDate'>;
export type ValidFilterString = Brand<string, 'FilterString'>;
export type ValidFilterNumber = Brand<number, 'FilterNumber'>;

export type FilterValue = ValidFilterString | ValidFilterNumber | ValidFilterDate | null;

export type Filter = {
  id: string;
  column: string;
  type: FilterType;
  value: FilterValue;
  displayValue: string;
  label: string;
  hitCount: number;
}

export type FilterCount = Pick<Filter, 'value' | 'hitCount'>;

export type FilterNestedNode = Partial<FilterCount> & Pick<FilterCount, 'value'> & {
  checked?: boolean;
  children?: FilterNestedNode[]
}

export type GroupedFilter = {
  [column: string]: Filter[]
}

/**
 * Each filter demands a different method to reduce search results.
 *
 * Check filter: search per __RegExp__ where all search values are chained with OR
 *
 * Date filter: search with __Moment__ that given date value is in between _from_ date and _to_ date
 *
 * Each type also has a type guard: __isFilterDate()__, __isRegExp()__
 */
export type FilterConstraints = RegExp | FilterDate;
