import { Filter } from './filter.model';
import { FilterType } from '../filter-type.model';
import { ValidFilterBoolean } from '../filter-value.model';
import { DatasourceTypes } from '../datasource.model';
import { filterByBoolean } from '../../helper/filter-by';

type BooleanFilterArgs = {
  value: boolean | null;
  column: string;
  label?: string;
};

export class BooleanFilter implements Filter {
  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterBoolean | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;

  constructor({value, column, label = ''}: BooleanFilterArgs) {
    this.type = 'boolean';
    this.value = this.isValidBoolean(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = value === true ? 'ustay.shared.form.data-grid.captions.yes' : 'ustay.shared.form.data-grid.captions.no';

    this.id = `${this.type}_${this.column}`;
  }

  matches(columnValue: DatasourceTypes) {
    if (typeof columnValue === 'boolean' && this.value !== null) {
      return filterByBoolean(columnValue, this.value);
    }

    return false;
  }

  private isValidBoolean(value: unknown): value is ValidFilterBoolean {
    return value !== null && value !== undefined && typeof value === 'boolean';
  }
}
