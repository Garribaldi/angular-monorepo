import { Filter } from './filter.model';
import { FilterType } from '../filter-type.model';
import { ValidFilterNumber } from '../filter-value.model';
import { isNumber } from 'chart.js/helpers';
import { DatasourceTypes } from '../datasource.model';
import { FilterNumericRange } from '../filter-numeric-range.model';
import { isNumeric } from '@local/shared/utils';

type NumericFilterArgs = { value: FilterNumericRange; column: string; label?: string; };

export class NumericFilter implements Filter {

  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterNumber | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;

  constructor({value, column, label = ''}: NumericFilterArgs) {
    this.type = 'number';
    this.value = this.isValidNumber(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = `${value.min ?? 0} - ${value.max ?? 0}`;

    this.id = `${this.type}_${this.column}`;
  }

  matches(columnValue: DatasourceTypes) {
    const {min, max} = this.value as ValidFilterNumber;

    if (isNumber(columnValue) && isNumeric(min)) {
      return columnValue >= min && columnValue <= max;
    }

    return false;
  }

  private isValidNumber(value: FilterNumericRange): value is ValidFilterNumber {
    return isNumber(value.min) && isNumber(value.max);
  }
}
