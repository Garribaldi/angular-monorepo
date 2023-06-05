import { Filter } from './filter.model';
import { FilterType } from './filter-type.model';
import { ValidFilterString } from './filter-value.model';

type CheckFilterArgs = {
  value: string;
  column: string;
  label?: string;
  hitCount?: number;
};

export class CheckFilter implements Filter {
  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterString | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;
  readonly hitCount: number;

  /**
   *
   * @param value unique filter value
   * @param column column filter is used in
   * @param label optional - _default_ is ''
   * @param hitCount optional - _default_ is 0
   */
  constructor({ value, column, label = '', hitCount = 0 }: CheckFilterArgs) {
    this.type = FilterType.CHECK_FILTER;
    this.value = this.isValidFilterString(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = value;
    this.hitCount = hitCount;

    this.id = `${this.type}_${this.column}_${this.value}`;
  }

  private isValidFilterString(value: unknown): value is ValidFilterString {
    return value !== null && value !== undefined && typeof value === 'string';
  }
}
