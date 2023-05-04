import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialFeatureShellRoutingModule } from './angular-material-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FilterShellComponent } from "./filter-shell/filter-shell.component";
import { AngularMaterialFeatureFilterModule } from "@local/angular-material/feature/filter";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    AngularMaterialFeatureFilterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [OverviewComponent, FilterShellComponent],
  exports: [OverviewComponent]
})
export class AngularMaterialFeatureShellModule {
}
