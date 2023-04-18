import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ActiveElement, ChartDataset, ChartOptions, ChartType, ChartTypeRegistry } from "chart.js";
import { Chart } from "chart.js/auto";
import { ChartEmitValue } from "@local/charts/data-access";
import { ChartsHelperService } from "../services/charts-helper.service";
import { ChartPointerEvent } from "../../../../../data-access/src/lib/models/chart-pointer-event.model";

@Directive({
  selector: 'canvas[baseChart]'
})
export class BaseChartDirective implements AfterViewInit {

  @Input() chartType!: ChartType;
  @Input() datasets!: ChartDataset<keyof ChartTypeRegistry>[];
  @Input() labels!: string[];
  @Input() options?: ChartOptions;

  @Output() chartClicked = new EventEmitter<ChartEmitValue>();

  private chart?: Chart;

  constructor(
    private readonly element: ElementRef,
    private readonly utils: ChartsHelperService
  ) {
  }

  ngAfterViewInit() {
    this.generateChart();
  }

  private generateChart(): void {
    const canvas = this.element.nativeElement as HTMLCanvasElement;
    const options = this.utils.addOption(this.options ?? {}, {
      onClick: (event: ChartPointerEvent, activeElement: ActiveElement[]) => {
        let key: string;
        let value: number;

        if (activeElement.length) {
          const {index, datasetIndex} = activeElement[0];
          key = this.labels[index];
          value = this.datasets[datasetIndex].data[index] as number;
        } else {
          key = this.labels[this.utils.getScaleValue(event, 'x')];
          value = this.utils.getScaleValue(event, 'y');
        }

        this.chartClicked.emit({key, value})
      }
    });
    const chartConfig = this.utils.buildConfig(this.chartType, options, this.labels, this.datasets);

    this.chart = new Chart(canvas, chartConfig);
  }
}
