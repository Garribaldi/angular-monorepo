import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTemplateNameDirective } from "./directives/ng-template-name.directive";
import { GetTemplateRefPipe } from './pipes/get-template-ref.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgTemplateNameDirective,
    GetTemplateRefPipe
  ],
  exports: [
    NgTemplateNameDirective,
    GetTemplateRefPipe
  ],
})
export class SharedUtilsModule {}
