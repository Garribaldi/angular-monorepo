import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { chartsFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';
import { ChartsFeatureBarModule } from "@local/charts/feature/bar";
import { ChartsFeatureLineModule } from "@local/charts/feature/line";
import { ChartsUtilsModule } from "@local/charts/utils";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(chartsFeatureShellRoutes),
        ChartsFeatureBarModule,
        ChartsFeatureLineModule,
        ChartsUtilsModule
    ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class ChartsFeatureShellModule {
}
