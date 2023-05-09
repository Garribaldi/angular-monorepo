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

export type FilterCount = Pick<Filter, 'value' | 'hitCount'>;
