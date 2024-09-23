import { FilterType } from '../filter-type.model';
import { Filter } from './filter.model';
import { ValidFilterString } from '../filter-value.model';
import { DatasourceTypes } from '../datasource.model';
import { isString } from '@local/shared/utils';
import { filterByRegExp } from '../../helper/filter-by';
import { isNumeric } from '../../helper/type-guards';
import { escapeRegExp } from '../../helper/utilities';

type CheckFilterArgs = {
  value: string;
  column: string;
  label?: string;
  hitCount?: number;
  multiple?: boolean;
};

export class CheckFilter implements Filter {
  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterString | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;
  readonly hitCount: number;
  readonly multiple: boolean;

  /**
   *
   * @param value unique filter value
   * @param column column filter is used in
   * @param label optional - _default_ is ''
   * @param hitCount optional - _default_ is 0
   * @param multiple
   */
  constructor({value, column, label = '', hitCount = 0, multiple = false}: CheckFilterArgs) {
    this.type = 'check';
    this.value = this.isValidFilterString(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = value || 'ustay.shared.form.data-grid.captions.unknown';
    this.hitCount = hitCount;
    this.multiple = multiple;

    this.id = `${this.type}_${this.column}_${this.value}`;
  }

  matches(columnValue: DatasourceTypes) {
    if (this.value === null) {
      return false;
    }

    if (this.value === '') {
      return columnValue === undefined || columnValue === null;
    }

    if (isString(columnValue)) {
      const regExp = this.multiple
        ? new RegExp(`(${escapeRegExp(this.value)})`, 'ig')
        : new RegExp(`(${escapeRegExp(this.value)})$`, 'ig');
      return filterByRegExp(columnValue, regExp);
    }

    if (isNumeric(columnValue)) {
      return columnValue === Number(this.value);
    }
    return false;
  }

  private isValidFilterString(value: unknown): value is ValidFilterString {
    return value !== null && value !== undefined && typeof value === 'string';
  }
}
