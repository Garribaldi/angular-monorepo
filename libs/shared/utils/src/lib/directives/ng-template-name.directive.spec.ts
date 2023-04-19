import { NgTemplateNameDirective } from './ng-template-name.directive';
import { TemplateRef } from "@angular/core";

describe('NgTemplateNameDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<any>;
    const directive = new NgTemplateNameDirective(templateRef);
    expect(directive).toBeTruthy();
  });
});
