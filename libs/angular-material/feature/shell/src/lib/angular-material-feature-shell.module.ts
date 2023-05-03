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

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent]
})
export class AngularMaterialFeatureShellModule {
}
