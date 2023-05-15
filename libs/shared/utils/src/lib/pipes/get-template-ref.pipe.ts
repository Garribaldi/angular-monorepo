import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { NgTemplateNameDirective } from "../directives/ng-template-name.directive";

@Pipe({
  name: 'getTemplateRef'
})
export class GetTemplateRefPipe implements PipeTransform {

  /**
   * Find a TemplateRef in a provided QueryList.
   * @param name Template name as used in name property of _NgTemplateNameDirective_
   * @param templates Query list which contains a collection of NgTemplateNameDirective-Instances
   */
  transform(name: string, templates: QueryList<NgTemplateNameDirective>): TemplateRef<HTMLElement> | null {
    const templateDirective = templates.find(template => template.name === name);
    return templateDirective?.template ?? null;
  }
}
