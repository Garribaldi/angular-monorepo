import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tableFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';
import { TableUiModule } from "@local/table/ui";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(tableFeatureShellRoutes),
    TableUiModule,
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class TableFeatureShellModule {}
