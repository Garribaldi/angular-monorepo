import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableHeaderTemplateDirective } from './table/table-header-template.directive';
import { TableRowTemplateDirective } from './table/table-row-template.directive';
import { MatTableModule } from '@angular/material/table';
import { MatTableComponent } from './mat-table/mat-table.component';
import { SharedUtilsModule } from "@local/shared/utils";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, MatTableModule, SharedUtilsModule, MatInputModule, MatButtonModule, MatTooltipModule, MatIconModule],
  declarations: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
    MatTableComponent
  ],
  exports: [
    TableComponent,
    TableHeaderTemplateDirective,
    TableRowTemplateDirective,
    MatTableComponent
  ],
})
export class SharedUiModule {
}
