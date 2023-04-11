import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { GenericTableFeatureShellRoutingModule } from "./generic-table-feature-shell-routing.module";
import { SharedUiModule } from "@local/shared/ui";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  imports: [CommonModule, GenericTableFeatureShellRoutingModule, SharedUiModule, MatTableModule],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class GenericTableFeatureShellModule {
}
