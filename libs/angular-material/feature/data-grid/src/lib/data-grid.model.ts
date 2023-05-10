import { Moment } from "moment";

export enum FilterType {
  CHECK_FILTER,
  DATE_FILTER
}

export type FilterValue = string | number | FilterDate;

export type FilterDate = {
  from?: Moment | null;
  to?: Moment | null;
}

export type FilterNestedNode = {
  value: FilterValue;
  hitCount?: number;
  checked?: boolean;
  children?: FilterNestedNode[]
}

export type Filter = {
  id: string;
  column: string;
  type: FilterType;
  value: FilterValue;
  displayValue: string;
  label: string;
  hitCount: number;
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

export type FilterCount = Pick<Filter, 'value' | 'hitCount'>;
