import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableHeaderTemplateDirective } from './table/table-header-template.directive';
import { TableRowTemplateDirective } from './table/table-row-template.directive';
import { SharedUtilsModule } from '@local/shared/utils';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilsModule,
  ],
  declarations: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective
  ],
  exports: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective
  ],
})
export class TableUiModule {}
