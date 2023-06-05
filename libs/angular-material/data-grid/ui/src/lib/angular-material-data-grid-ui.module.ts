import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridCheckFilterComponent } from "./data-grid-check-filter/data-grid-check-filter.component";
import { DataGridChipsBarComponent } from "./data-grid-chips-bar/data-grid-chips-bar.component";
import { DataGridDateFilterComponent } from "./data-grid-date-filter/data-grid-date-filter.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SharedUtilsModule } from "@local/shared/utils";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    SharedUtilsModule,
    MatChipsModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  declarations: [
    DataGridCheckFilterComponent,
    DataGridChipsBarComponent,
    DataGridDateFilterComponent
  ],
  exports: [
    DataGridCheckFilterComponent,
    DataGridChipsBarComponent,
    DataGridDateFilterComponent
  ]

})
export class AngularMaterialDataGridUiModule {}
