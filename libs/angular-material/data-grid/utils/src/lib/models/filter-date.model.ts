import { Moment } from 'moment/moment';

export type FilterDate = {
  from: Moment | null;
  to: Moment | null;
};
