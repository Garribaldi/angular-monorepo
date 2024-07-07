import { Observable } from 'rxjs';

/**
 * Table column definition interface
 */
export type ITableColumn = {
  /** Display column name */
  name: string;
  /** Column header text (translated) */
  label: string;
  /** Column header style */
  labelStyle?: TableHeaderStyleType;
  /** Column data key, e.g. 'name', 'person.name' */
  dataKey: string;
  /** Column data key addon (used for fa-icon prefix) */
  dataKeyAddon?: string;
  /** Column data type */
  dataType: TableColumnType;
  /** Column data position */
  position?: 'right' | 'left' | 'center';
  /** Column alternate text for boolean values */
  booleanText?: {
    true: string;
    false: string;
  };
  /** Column code configuration for code values */
  codeConfig?: ICodeConfig;
  /** Column select configuration */
  selectConfig?: {
    display: string;
    value: string;
    selectionChanged?: TableRowFunctionType;
    source: Observable<any>;
    withFilter?: boolean;
  };
  /** Column is editable */
  isEditable?: boolean;
  /** Column value is required */
  isRequired?: boolean;
  /** Column is sortable */
  isSortable?: boolean;
  /** Column is asynchronous, e.g. Observable or BehaviourSubject */
  isAsync?: boolean;
}

export type TableColumnType = 'img' | 'text' | 'date' | 'date-time' | 'number' | 'icon' | 'checkbox' | 'code' | 'select';

type TableHeaderStyleType = 'bold' | 'italic';

type ICodeConfig = {
  codeQuery: ICodeDataRequest;
  codeType: string;
};

type ICodeDataRequest = {
  /** Custom code data request parameter */
  [key: string]: any;
};

type TableRowFunctionType = (row: any) => void;
