export type DatasourceTypes = string | number | Date;

export type Datasource<T> = {[Property in keyof T]: T[Property] extends DatasourceTypes ? DatasourceTypes : never};
