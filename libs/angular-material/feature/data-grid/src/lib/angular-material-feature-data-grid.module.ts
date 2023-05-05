import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { MatCardModule } from "@angular/material/card";

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [DataGridComponent, DataGridColumnComponent],
  exports: [DataGridComponent, DataGridColumnComponent],
})
export class AngularMaterialFeatureDataGridModule {}
