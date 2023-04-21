import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialFeatureShellRoutingModule } from './angular-material-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AngularMaterialFeatureDialogModule } from "@local/angular-material/feature/dialog";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialFeatureShellRoutingModule,
    AngularMaterialFeatureDialogModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class AngularMaterialFeatureShellModule {
}
