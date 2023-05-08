import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataGridColumnComponent } from './data-grid-column/data-grid-column.component';
import { MatCardModule } from '@angular/material/card';
import { DataGridCheckFilterComponent } from './data-grid-check-filter/data-grid-check-filter.component';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataGridChipsBarComponent } from './data-grid-chips-bar/data-grid-chips-bar.component';
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTreeModule,
    CdkTreeModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  declarations: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridCheckFilterComponent,
    DataGridChipsBarComponent,
  ],
  exports: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridChipsBarComponent,
  ],
})
export class AngularMaterialFeatureDataGridModule {}
