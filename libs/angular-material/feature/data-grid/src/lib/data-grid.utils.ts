import { FilterDate } from "@local/angular-material/feature/data-grid";
import * as moment from "moment";

type DateBrand = (FilterDate | string) & { __brand: 'Date' };

const dateFormat = 'DDMMYYYY';

export function isValidFilterDate(date: FilterDate | string): date is DateBrand {
  if (typeof date === 'string') {
    const dateSegments = date.split('-').filter(dateSegment => !!dateSegment);
    return dateSegments.length
      ? !dateSegments.some(dateSegment => !moment(dateSegment, dateFormat, true).isValid())
      : false;
  }

  return !!date.from || !!date.to;
}
