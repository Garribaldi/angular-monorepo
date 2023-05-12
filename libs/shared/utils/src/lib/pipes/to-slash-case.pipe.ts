import { Pipe, PipeTransform } from '@angular/core';
import { convertToSlashCase } from "../helpers/utilities";

@Pipe({
  name: 'toSlashCase'
})
export class ToSlashCasePipe implements PipeTransform {

  transform(value: string): string {
    return convertToSlashCase(value);
  }
}
