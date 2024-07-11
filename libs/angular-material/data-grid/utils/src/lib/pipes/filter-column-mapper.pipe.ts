import { Pipe, PipeTransform } from '@angular/core';

import { FilterColumn } from '../models/filter-column.model';
import { FilterType } from '../models/filter-type.model';
import { ITableColumn, TableColumnType } from '@local/shared/utils';


/**
 * Maps a ITableColumn object to a FilterColumn.
 *
 * Converts the table column type to an appropriate filter type.
 *
 * Optionally, you can provide an array of keys that should be transformed to a check filter.
 *
 * Example:
 * <pre>
 * <shared-data-grid-column *ngFor="let filterColumn of tableColumns | filterColumnMapper: ['accommodation', 'nationality']">
 * </pre>
 */
@Pipe({
  name: 'filterColumnMapper'
})
export class FilterColumnMapperPipe implements PipeTransform {

  /**
   * @param {ITableColumn[]} tableColumns Table column configuration
   * @param {string[]} checkFilterColumns _optional_ List of keys to be converted to check filter. Field must be of table type 'text'
   * @return {FilterColumn[]}
   */
  transform(tableColumns: ITableColumn[], checkFilterColumns: string[] = []): FilterColumn[] {
    return tableColumns.map(tableColumn => ({
      key: tableColumn.dataKey,
      type: this.matchType(tableColumn.dataType, checkFilterColumns.indexOf(tableColumn.dataKey) > -1),
      label: tableColumn.label
    }));
  }

  private matchType(type: TableColumnType, isCheckColumn: boolean): FilterType {
    if (type === 'checkbox') {
      return 'boolean';
    }

    if (type === 'date') {
      return 'date';
    }

    if (type === 'text') {
      return isCheckColumn ? 'check' : 'search';
    }

    if (type === 'number') {
      return 'number';
    }

    return 'search';
  }
}
