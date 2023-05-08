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

// export type FilterTreeItem = {
//   name: string;
//   children?: FilterTreeItem[];
// };

export type Filter = {
  id: string;
  type: FilterType;
  value: FilterValue;
  column: string;
  displayValue: string;
  hitCount: number;
  selected: boolean;
}

export type FilterCount = Pick<Filter, 'value' | 'hitCount'>;
