import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tableFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';
import { TableFeatureTableModule } from '@local/table/feature/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(tableFeatureShellRoutes),
    TableFeatureTableModule,
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class TableFeatureShellModule {}
