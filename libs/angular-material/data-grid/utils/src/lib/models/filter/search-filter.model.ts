import { Filter } from './filter.model';
import { FilterType } from '../filter-type.model';
import { ValidFilterString } from '../filter-value.model';
import { DatasourceTypes } from '../datasource.model';
import { isString } from '@local/shared/utils';
import { filterByRegExp } from '../../helper/filter-by';

type SearchFilterArgs = {
  value: string | null;
  column: string;
  label?: string;
};

export class SearchFilter implements Filter {
  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterString | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;

  constructor({value, column, label = ''}: SearchFilterArgs) {
    this.type = 'search';
    this.value = this.isValidFilterString(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = value ?? '';

    this.id = `${this.type}_${this.column}`;
  }

  matches(columnValue: DatasourceTypes) {
    if (isString(columnValue)) {
      const regExp = new RegExp(`(${this.value})`, 'ig');
      return filterByRegExp(columnValue, regExp);
    }

    return false;
  }

  private isValidFilterString(value: unknown): value is ValidFilterString {
    return value !== null && value !== undefined && typeof value === 'string';
  }
}
