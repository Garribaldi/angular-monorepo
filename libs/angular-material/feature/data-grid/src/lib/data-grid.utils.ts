import { FilterDate } from "./data-grid.model";

type DateBrand = FilterDate & { __brand: 'Date' };

export function isValidFilterDate(date: FilterDate): date is DateBrand {
  return !!date.from || !!date.to;
}

export function isFilterDate(value: unknown): value is FilterDate {
  return (
    typeof value === 'object'
    && value !== null
    && 'to' in value
    && 'from' in value);
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}
