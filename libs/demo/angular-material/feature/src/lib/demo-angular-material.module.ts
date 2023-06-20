import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoAngularMaterialComponent } from './demo-angular-material.component';
import { AngularMaterialDataGridModule } from '@local/angular-material/data-grid/feature';
import { DemoDataGridComponent } from './demo-data-grid/demo-data-grid.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DemoTableComponent } from './demo-table/demo-table.component';
import { DemoDialogComponent } from './demo-dialog/demo-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DemoGenericTableComponent } from './demo-generic-table/demo-generic-table.component';
import { AngularMaterialGenericTableModule } from '@local/angular-material/generic-table/feature';
import { SharedUtilsModule } from '@local/shared/utils';
import { DemoFilterComponent } from './demo-filter/demo-filter.component';
import { AngularMaterialFilterModule } from '@local/angular-material/filter/feature';
import { DemoSliderComponent } from './demo-slider/demo-slider.component';
import { AngularMaterialSliderModule } from '@local/angular-material/slider/feature';
import { SharedSubnavModule } from "@local/shared/feature/subnav";
import { DemoAngularMaterialRoutingModule } from "./demo-angular-material-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedSubnavModule,
    DemoAngularMaterialRoutingModule,
    AngularMaterialDataGridModule,
    AngularMaterialGenericTableModule,
    AngularMaterialFilterModule,
    AngularMaterialSliderModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    SharedUtilsModule
  ],
  declarations: [
    DemoAngularMaterialComponent,
    DemoTableComponent,
    DemoDataGridComponent,
    DemoDialogComponent,
    DemoGenericTableComponent,
    DemoFilterComponent,
    DemoSliderComponent,
  ],
})
export class DemoAngularMaterialModule {}
