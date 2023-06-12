import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTemplateNameDirective } from "./directives/ng-template-name.directive";
import { GetTemplateRefPipe } from './pipes/get-template-ref.pipe';
import { DisableInputAssistanceDirective } from './directives/disable-input-assistance.directive';
import { ToSlashCasePipe } from './pipes/to-slash-case.pipe';
import { CypressSelectorDirective } from './directives/cypress-selector.directive';
import { BeforeUnloadDirective } from './directives/before-unload.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgTemplateNameDirective,
    GetTemplateRefPipe,
    DisableInputAssistanceDirective,
    ToSlashCasePipe,
    CypressSelectorDirective,
    BeforeUnloadDirective
  ],
  exports: [
    NgTemplateNameDirective,
    GetTemplateRefPipe,
    DisableInputAssistanceDirective,
    ToSlashCasePipe,
    CypressSelectorDirective,
    BeforeUnloadDirective
  ],
})
export class SharedUtilsModule {}
