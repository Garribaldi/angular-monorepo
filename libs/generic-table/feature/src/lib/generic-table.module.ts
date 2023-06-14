import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { TableHeaderTemplateDirective } from './table-header-template.directive';
import { TableRowTemplateDirective } from './table-row-template.directive';
import { SharedUtilsModule } from 'libs/shared/utils/src';

@NgModule({
  imports: [CommonModule, SharedUtilsModule],
  declarations: [
    GenericTableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
  ],
  exports: [
    GenericTableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
  ],
})
export class GenericTableModule {}
