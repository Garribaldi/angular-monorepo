import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from './utils/directives/base-chart.directive';
import { ChartsHelperService } from "./utils/services/charts-helper.service";

@NgModule({
  imports: [CommonModule],
  declarations: [
    BaseChartDirective
  ],
  exports: [
    BaseChartDirective
  ],
  providers: [
    ChartsHelperService
  ]
})
export class ChartsUtilsModule {
}
