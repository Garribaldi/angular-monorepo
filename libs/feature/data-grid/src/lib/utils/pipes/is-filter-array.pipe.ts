import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from '../models/filter/filter.model';

/**
 * Return filter array if value is defined and an array.
 *
 * Otherwise, return empty array.
 *
 * @param {Filter | Filter[] | undefined} value
 * @return {typeof value}
 */
@Pipe({
  name: 'isFilterArray'
})
export class IsFilterArrayPipe implements PipeTransform {

  transform(value: Filter | Filter[] | undefined): Filter[] {
    return Array.isArray(value) ? value : [];
  }
}
