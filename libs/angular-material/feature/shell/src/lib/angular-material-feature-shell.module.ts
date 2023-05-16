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
import { AngularMaterialFeatureFilterModule } from '@local/angular-material/feature/filter';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialFeatureDialogModule } from '@local/angular-material/feature/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogShellComponent } from './dialog-shell/dialog-shell.component';
import { MatButtonModule } from '@angular/material/button';
import { DataGridShellComponent } from './data-grid-shell/data-grid-shell.component';
import { MatTabsModule } from "@angular/material/tabs";
import { AngularMaterialFeatureDataGridModule } from "@local/angular-material/feature/data-grid";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    AngularMaterialFeatureFilterModule,
    AngularMaterialFeatureDialogModule,
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
    AngularMaterialFeatureDataGridModule
  ],
  declarations: [
    OverviewComponent,
    FilterShellComponent,
    DialogShellComponent,
    DataGridShellComponent
  ],
  exports: [
    OverviewComponent
  ]
})
export class AngularMaterialFeatureShellModule {
}
