import { FilterType } from './filter-type.model';

export type FilterColumn = {
  key: string;
  type: FilterType;
  label: string;
};
