import { FilterType } from "./filter-type.model";
import { FilterValue } from "./filter-value.model";

export type Filter = {
  id: string;
  column: string;
  type: FilterType;
  value: FilterValue;
  displayValue: string;
  label: string;
  hitCount?: number;
}
