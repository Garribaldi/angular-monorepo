import { Injectable } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, ChartTypeRegistry } from "chart.js";
import { ChartConfiguration } from "chart.js/auto";
import { ChartPointerEvent } from "@local/charts/data-access";

@Injectable()
export class ChartsHelperService {

  getScaleValue(event: ChartPointerEvent, axis: 'x' | 'y'): number {
    return event.chart.scales[axis].getValueForPixel(event[axis] ?? 0) ?? 0;
  }

  addOption(options: ChartOptions, newOption: Partial<ChartOptions>): ChartOptions {
    return {...options, ...newOption}
  }

  buildConfig(
    type: ChartType,
    options: ChartOptions,
    labels: string[] = [],
    datasets: ChartDataset<keyof ChartTypeRegistry>[] = []
  ): ChartConfiguration<keyof ChartTypeRegistry> {
    return {
      type,
      data: {
        labels,
        datasets
      },
      options
    }
  }
}
