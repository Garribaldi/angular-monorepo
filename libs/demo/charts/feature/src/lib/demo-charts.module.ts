import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { demoChartsFeatureRoutes } from './lib.routes';
import { DemoChartsComponent } from './demo-charts.component';
import { ChartsModule } from "@local/charts/feature";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(demoChartsFeatureRoutes),
    ChartsModule
  ],
  declarations: [DemoChartsComponent],
  exports: [DemoChartsComponent],
})
export class DemoChartsModule {}
