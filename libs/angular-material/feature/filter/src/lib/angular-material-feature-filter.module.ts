import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { FilterShellComponent } from './filter-shell/filter-shell.component';
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { SharedUtilsModule } from "@local/shared/utils";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    FormsModule,
    SharedUtilsModule
  ],
  declarations: [FilterComponent, FilterShellComponent],
  exports: [FilterComponent, FilterShellComponent],
})
export class AngularMaterialFeatureFilterModule {}
