import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ActiveElement, ChartDataset, ChartOptions, ChartType, ChartTypeRegistry } from "chart.js";
import { Chart } from "chart.js/auto";
import { ChartEmitValue, ChartPointerEvent } from "@local/charts/data-access";
import { ChartsHelperService } from "../services/charts-helper.service";

const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

@Directive({
  selector: 'canvas[baseChart]'
})
export class BaseChartDirective implements AfterViewInit {

  /**
   * "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar"
   */
  @Input() chartType!: ChartType;
  @Input() datasets!: ChartDataset<keyof ChartTypeRegistry>[];
  @Input() labels!: string[];
  @Input() options?: ChartOptions;

  @Output() chartClicked = new EventEmitter<ChartEmitValue>();

  private chart?: Chart;

  private mergedOptions: ChartOptions = {};

  constructor(
    private readonly element: ElementRef,
    private readonly chartsHelper: ChartsHelperService
  ) {
  }

  ngAfterViewInit() {
    this.generateChart();
  }

  private generateChart(): void {
    const canvas = this.element.nativeElement as HTMLCanvasElement;

    this.mergedOptions = this.chartsHelper.addOption(defaultOptions, this.options ?? {});
    this.mergedOptions = this.chartsHelper.addOption(this.mergedOptions, {
      onClick: (event: ChartPointerEvent, activeElement: ActiveElement[]) => {
        let key: string;
        let value: number;

        if (activeElement.length) {
          const {index, datasetIndex} = activeElement[0];
          key = this.labels[index];
          value = this.datasets[datasetIndex].data[index] as number;
        } else {
          key = this.labels[this.chartsHelper.getScaleValue(event, 'x')];
          value = this.chartsHelper.getScaleValue(event, 'y');
        }

        const chart = this.chart ?? {} as Chart;
        this.chartClicked.emit({chart, key, value})
      }
    });
    const chartConfig = this.chartsHelper.buildConfig(this.chartType, this.mergedOptions, this.labels, this.datasets);

    this.chart = new Chart(canvas, chartConfig);
  }
}
