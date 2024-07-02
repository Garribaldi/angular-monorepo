import { FilterValueHitCount } from './filter-value-hit-count.model';

export type FilterNestedNode = Partial<FilterValueHitCount> & Pick<FilterValueHitCount, 'value'> & {
  checked?: boolean;
  children?: FilterNestedNode[]
};
