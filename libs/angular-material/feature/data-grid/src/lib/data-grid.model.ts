export enum FilterType {
  UNKNOWN_FILTER,
  DATE_FILTER,
  NUMBER_FILTER,
  TEXT_FILTER,
  BOOLEAN_FILTER,
}

export type FilterValue = string | number | Date;

export type FilterDate = {
  from?: Date | null;
  to?: Date | null;
}

export type FilterFlatNode = {
  name: string;
  expandable: boolean;
  level: number;
  isExpanded?: boolean;
}

export type FilterTreeItem = {
  name: string;
  children?: FilterTreeItem[];
};

export type Filter = {
  id: string;
  type: FilterType;
  value: FilterValue;
  displayValue: string;
  hitCount: number;
}
