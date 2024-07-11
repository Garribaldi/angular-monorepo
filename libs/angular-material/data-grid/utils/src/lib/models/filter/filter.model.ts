import { FilterValue } from '../filter-value.model';
import { FilterType } from '../filter-type.model';
import { DatasourceTypes } from '../datasource.model';

export type Filter = {
  id: string;
  column: string;
  type: FilterType;
  value: FilterValue;
  displayValue: string;
  label: string;
  hitCount?: number;
  matches: (columnValue: DatasourceTypes) => boolean
};
