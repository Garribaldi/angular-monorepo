import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableHeaderTemplateDirective } from './table/table-header-template.directive';
import { TableRowTemplateDirective } from './table/table-row-template.directive';
import { MatTableModule } from "@angular/material/table";

@NgModule({
    imports: [CommonModule, MatTableModule],
  declarations: [TableComponent, TableHeaderTemplateDirective, TableRowTemplateDirective],
  exports: [TableComponent, TableHeaderTemplateDirective, TableRowTemplateDirective],
})
export class SharedUiModule {}
