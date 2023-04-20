import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { GenericTableFeatureShellRoutingModule } from "./generic-table-feature-shell-routing.module";
import { SharedUiModule } from "@local/shared/ui";
import { MatTableModule } from "@angular/material/table";
import { SharedUtilsModule } from "@local/shared/utils";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    GenericTableFeatureShellRoutingModule,
    SharedUiModule,
    MatTableModule,
    SharedUtilsModule,
    MatButtonModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class GenericTableFeatureShellModule {
}
