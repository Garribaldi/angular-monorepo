import { DataObject } from './data.object.model';

export type CsvColumn<T extends DataObject> = {
  headerLabel: string;
  fieldName: keyof T
};
