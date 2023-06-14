/**
 * Use index signature as we don't know the column names
 */
export type ColumnDef = {
  [key: string]: string
}
