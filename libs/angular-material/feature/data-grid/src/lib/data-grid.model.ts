export enum FilterType {
  CHECK_FILTER,
  DATE_FILTER
}

export type FilterValue = string | number | Date;

export type FilterDate = {
  from?: Date | null;
  to?: Date | null;
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

export type FilterCount = Pick<Filter, 'value' | 'hitCount'>;
