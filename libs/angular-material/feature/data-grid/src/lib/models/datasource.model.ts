export type DatasourceTypes = string | number| Date;

export type Datasource<T> = {[Property in keyof T]: DatasourceTypes};
