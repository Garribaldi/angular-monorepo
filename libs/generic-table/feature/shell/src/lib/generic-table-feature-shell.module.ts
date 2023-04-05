import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { GenericTableFeatureShellRoutingModule } from "./generic-table-feature-shell-routing.module";
import { SharedFeatureTableModule } from "@local/shared/feature/table";

@NgModule({
  imports: [CommonModule, GenericTableFeatureShellRoutingModule, SharedFeatureTableModule],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class GenericTableFeatureShellModule {
}
