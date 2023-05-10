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
import { MatChipsModule } from '@angular/material/chips';
import { DataGridDateFilterComponent } from './data-grid-date-filter/data-grid-date-filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MAT_DATE_LOCALE } from "@angular/material/core";

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
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  declarations: [
    DataGridComponent,
    DataGridColumnComponent,
    DataGridCheckFilterComponent,
    DataGridChipsBarComponent,
    DataGridDateFilterComponent,
  ],
  exports: [
    DataGridComponent,
    DataGridColumnComponent
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'de-DE'
    }
  ]
})
export class AngularMaterialFeatureDataGridModule {}
