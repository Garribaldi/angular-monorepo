import { Filter } from "./models/filter.model";
import { FilterDate } from "./models/filter-date.model";

export function isFilterDate(value: unknown): value is FilterDate {
  return (
    typeof value === 'object'
    && value !== null
    && 'to' in value
    && 'from' in value
  );
}

/**
 * Check if a value is a filter array
 * @param value test value that could be an array of type _Filter_
 */
export function isFilterArray(value: unknown): value is Filter[] {
  return Array.isArray(value) && value.some(val => 'type' in val);
}
