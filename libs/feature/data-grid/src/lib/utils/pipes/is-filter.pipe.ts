import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from '../models/filter/filter.model';

/**
 * Return single filter if value is defined and not an array.
 *
 * Otherwise return undefined.
 *
 * @param {Filter | Filter[] | undefined} value
 * @return {typeof value}
 */
@Pipe({
  name: 'isFilter'
})
export class IsFilterPipe implements PipeTransform {

  transform(value: Filter | Filter[] | undefined): Filter | undefined {
    return (value !== undefined && !Array.isArray(value)) ? value : undefined;
  }
}
