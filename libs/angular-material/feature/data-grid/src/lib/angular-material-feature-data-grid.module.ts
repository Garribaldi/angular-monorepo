import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { MatCardModule } from '@angular/material/card';
import { DataGridTextFilterComponent } from './data-grid-text-filter/data-grid-text-filter.component';
import { MatTreeModule } from "@angular/material/tree";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, MatCardModule, MatTreeModule, CdkTreeModule, MatButtonModule, MatIconModule],
  declarations: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridTextFilterComponent,
  ],
  exports: [
    DataGridComponent,
    DataGridColumnComponent
  ],
})
export class AngularMaterialFeatureDataGridModule {}
