import { Filter } from "./filter.model";
import { ValidFilterDate } from "./filter-value.model";
import { FilterType } from "./filter-type.model";
import { FilterDate } from "./filter-date.model";

type DateFilterArgs = { value: FilterDate, column: string, label?: string };

export class DateFilter implements Filter {

  readonly id: string;
  readonly type: FilterType;
  readonly value: ValidFilterDate | null;
  readonly column: string;
  readonly label: string;
  readonly displayValue: string;

  /**
   *
   * @param value unqiue _FilterDate_
   * @param column column filter is used in
   * @param label optional - _default_ is ''
   * @param displayValue optional - _default_ is ''
   */
  constructor({value, column, label = ''}: DateFilterArgs) {
    this.type = FilterType.DATE_FILTER;
    this.value = this.isValidFilterDate(value) ? value : null;
    this.column = column;
    this.label = label;
    this.displayValue = `${this.value?.from?.format('L') ?? ''} - ${this.value?.to?.format('L') ?? ''}`;

    this.id = `${this.type}_${this.column}`;
  }

  private isValidFilterDate(date: FilterDate): date is ValidFilterDate {
    return !!date && (!!date.from || !!date.to);
  }
}
