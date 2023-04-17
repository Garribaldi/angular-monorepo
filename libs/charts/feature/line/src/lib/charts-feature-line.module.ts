import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line/line.component';
import { ChartsUiModule } from "@local/charts/ui";

@NgModule({
  imports: [CommonModule, ChartsUiModule],
  declarations: [LineComponent],
  exports: [LineComponent],
})
export class ChartsFeatureLineModule {}
