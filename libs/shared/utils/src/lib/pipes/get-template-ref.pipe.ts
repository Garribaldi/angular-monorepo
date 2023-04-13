import { Pipe, PipeTransform, QueryList, TemplateRef } from '@angular/core';
import { NgTemplateNameDirective } from "../directives/ng-template-name.directive";

@Pipe({
  name: 'getTemplateRef'
})
export class GetTemplateRefPipe implements PipeTransform {
  transform(name: string, templates: QueryList<NgTemplateNameDirective>): TemplateRef<HTMLElement> | null {
    const templateDirective = templates.find(template => template.name === name);
    return templateDirective?.template ?? null;
  }
}
