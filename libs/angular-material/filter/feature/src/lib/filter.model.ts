export type FilterColumnProperty = string | number | symbol;
export type FilterTypes = string | number | Date;
export type FilterDefinition = {
  filterLabel: string;
  filterValue: FilterTypes;
};
