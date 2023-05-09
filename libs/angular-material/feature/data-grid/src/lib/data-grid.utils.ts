import { FilterDate } from "./data-grid.model";

type DateBrand = FilterDate & { __brand: 'Date' };

export function isValidFilterDate(date: FilterDate): date is DateBrand {
  return !!date.from || !!date.to;
}
