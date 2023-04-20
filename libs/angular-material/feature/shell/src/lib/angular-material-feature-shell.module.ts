import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialFeatureShellRoutingModule } from './angular-material-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    MatDialogModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class AngularMaterialFeatureShellModule {
}
