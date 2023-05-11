import { FilterDate } from "./filter-date.model";

/**
 * Each filter demands a different method to reduce search results.
 *
 * Check filter: search per __RegExp__ where all search values are chained with OR
 *
 * Date filter: search with __Moment__ that given date value is in between _from_ date and _to_ date
 *
 * Each type also has a type guard: __isFilterDate()__, __isRegExp()__
 */
export type FilterConstraints = RegExp | FilterDate;
