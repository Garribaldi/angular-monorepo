import { Injectable } from '@angular/core';
import { DataObject, removeSpecialCharacters } from '@local/shared/utils';
import { CsvColumn } from '../models/csv-column.model';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileExportService {

  private readonly UTF8_BOM = [0xEF, 0xBB, 0xBF];

  /**
   * Export flat data object to a UTF-8 CSV file.
   * @param data flat data object
   * @param config configuration file which specifies header label and field name
   * @param filename filename as string without file extension
   * @param separator (optional) csv separator, _default_ is |
   */
  saveToCsv<T extends DataObject>(data: T[], config: CsvColumn<T>[], filename: string, separator = '|') {
    const headers = config.map(column => column.headerLabel);
    const fields = config.map(column => column.fieldName);
    const mappedData = data.map(item => fields.map(field => String(item[field] ?? '')));
    mappedData.unshift(headers);

    const csvString = mappedData.reduce((csvString, currentLine) => `${csvString}${currentLine.join(separator)}\r\n`, '');
    const blob = new Blob(
      [
        new Uint8Array(this.UTF8_BOM),
        csvString
      ],
      {type: 'text/csv;charset=utf-8'}
    );
    saveAs(blob, `${removeSpecialCharacters(filename)}.csv`);
  }
}
