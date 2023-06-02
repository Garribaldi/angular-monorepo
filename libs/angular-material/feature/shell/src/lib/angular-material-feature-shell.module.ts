import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialFeatureShellRoutingModule } from './angular-material-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterShellComponent } from './filter-shell/filter-shell.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogShellComponent } from './dialog-shell/dialog-shell.component';
import { MatButtonModule } from '@angular/material/button';
import { DataGridShellComponent } from './data-grid-shell/data-grid-shell.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SliderShellComponent } from './slider-shell/slider-shell.component';
import { AngularMaterialFeatureSliderModule } from "@local/angular-material/feature/slider";
import { GenericTableShellComponent } from "./generic-table-shell/generic-table-shell.component";
import { AngularMaterialFeatureGenericTableModule } from "@local/angular-material/feature/generic-table";
import { SharedUtilsModule } from "@local/shared/utils";
import { AngularMaterialDialogModule } from "@local/angular-material/dialog/feature";
import { AngularMaterialFilterModule } from "@local/angular-material/filter/feature";
import { AngularMaterialDataGridModule } from "@local/angular-material/data-grid/feature";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    AngularMaterialDialogModule,
    AngularMaterialFilterModule,
    AngularMaterialDataGridModule,
    AngularMaterialFeatureSliderModule,
    AngularMaterialFeatureGenericTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule,
    SharedUtilsModule
  ],
  declarations: [
    OverviewComponent,
    FilterShellComponent,
    DialogShellComponent,
    DataGridShellComponent,
    SliderShellComponent,
    GenericTableShellComponent
  ],
  exports: [OverviewComponent],
})
export class AngularMaterialFeatureShellModule {}
