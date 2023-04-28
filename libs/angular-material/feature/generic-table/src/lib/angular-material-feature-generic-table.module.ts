import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './ui/generic-table/generic-table.component';
import { MatTableModule } from '@angular/material/table';
import { SharedUtilsModule } from '@local/shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { GenericTableShellComponent } from './ui/overview/generic-table-shell.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    SharedUtilsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
  ],
  declarations: [GenericTableComponent, GenericTableShellComponent],
  exports: [GenericTableComponent, GenericTableShellComponent],
})
export class AngularMaterialFeatureGenericTableModule {}
