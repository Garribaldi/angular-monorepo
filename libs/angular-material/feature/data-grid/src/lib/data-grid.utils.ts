import { Filter, FilterDate, ValidFilterDate, ValidFilterNumber, ValidFilterString } from "./data-grid-filter.model";

export function isFilterDate(value: unknown): value is FilterDate {
  return (
    typeof value === 'object'
    && value !== null
    && 'to' in value
    && 'from' in value
  );
}

export function isValidFilterDate(date: FilterDate): date is ValidFilterDate {
  return !!date.from || !!date.to;
}

export function isValidFilterString(value: unknown): value is ValidFilterString {
  return value !== null && value !== undefined && typeof value === "string";
}

export function isValidFilterNumber(value: unknown): value is ValidFilterNumber {
  return value !== null && value !== undefined && typeof value === "number";
}

/**
 * Check if a value is a filter array
 * @param value test value that could be an array of type _Filter_
 */
export function isFilterArray(value: unknown): value is Filter[] {
  return Array.isArray(value) && value.some(val => 'type' in val);
}
