import { Brand } from "@local/shared/data-access";
import { FilterDate } from "./filter-date.model";

export type ValidFilterString = Brand<string, 'FilterString'>;
export type ValidFilterDate = Brand<FilterDate, 'FilterDate'>;
export type ValidFilterNumber = Brand<number, 'FilterNumber'>;

export type FilterValue = ValidFilterString | ValidFilterNumber | ValidFilterDate | null;
