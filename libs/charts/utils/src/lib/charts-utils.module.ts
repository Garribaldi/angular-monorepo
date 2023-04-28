import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from './directives/base-chart.directive';
import { ChartsHelperService } from "./services/charts-helper.service";

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
