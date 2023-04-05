import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import {GenericTableFeatureShellRoutingModule} from "./generic-table-feature-shell-routing.module";

@NgModule({
  imports: [CommonModule, GenericTableFeatureShellRoutingModule],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class GenericTableFeatureShellModule {}
