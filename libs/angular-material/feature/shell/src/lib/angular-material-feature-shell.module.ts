import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialFeatureShellRoutingModule } from './angular-material-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [CommonModule, AngularMaterialFeatureShellRoutingModule],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class AngularMaterialFeatureShellModule {}
