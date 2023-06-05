import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from "./base-chart.directive";
import { ChartsHelperService } from "./charts-helper.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BaseChartDirective],
  exports: [BaseChartDirective],
  providers: [ChartsHelperService]
})
export class ChartsModule {
}
