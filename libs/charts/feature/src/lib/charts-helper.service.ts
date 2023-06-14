import { Injectable } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, ChartTypeRegistry } from "chart.js";
import { ChartConfiguration } from "chart.js/auto";
import { ChartPointerEvent } from './chart-pointer-event.model';

@Injectable()
export class ChartsHelperService {

  /**
   * For compatible charts like bar or line, determine value for x/y coordinates
   * @param event click event from chart
   * @param axis union type, 'x' and 'y' allowed
   */
  getScaleValue(event: ChartPointerEvent, axis: 'x' | 'y'): number {
    return event.chart.scales[axis].getValueForPixel(event[axis] ?? 0) ?? 0;
  }

  /**
   * Merge two _ChartOptions_ configurations
   * @param options base config
   * @param newOptions new properties to integrate into base config
   */
  addOption(options: ChartOptions, newOptions: Partial<ChartOptions>): ChartOptions {
    return {...options, ...newOptions}
  }

  /**
   * Build chart configuration object to be used in chartjs constructor
   * @param type chart type (bar, line, etc...)
   * @param options additional options
   * @param labels label array for certain chart types (default empty)
   * @param datasets datasource
   */
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
