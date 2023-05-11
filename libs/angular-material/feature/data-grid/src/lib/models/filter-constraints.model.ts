import { FilterDate } from "./filter-date.model";

/**
 * Each filter demands a different method to reduce search results.
 *
 * Check filter: search per __RegExp__ where all search values are chained with OR
 *
 * Date filter: search with _Moment_ that given __FilterDate__ value is in between _from_ date and _to_ date
 *
 * Each type also has a type guard: __isRegExp()__, __isFilterDate()__
 */
export type FilterConstraints = RegExp | FilterDate;
