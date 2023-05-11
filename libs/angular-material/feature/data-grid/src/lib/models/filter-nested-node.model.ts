import { FilterValueCount } from "./filter-value-count.model";

export type FilterNestedNode = Partial<FilterValueCount> & Pick<FilterValueCount, 'value'> & {
  checked?: boolean;
  children?: FilterNestedNode[]
}

