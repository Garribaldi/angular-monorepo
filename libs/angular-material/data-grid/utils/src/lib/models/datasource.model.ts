export type DatasourceTypes = string | number | boolean | Date | null | undefined;

export type Datasource<T> = { [Property in keyof T]: DatasourceTypes } & {_datasourceIndex?: number};
