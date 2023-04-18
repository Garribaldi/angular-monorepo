import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartItem, ChartOptions } from "chart.js/auto";

@Component({
  selector: 'charts-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
  @ViewChild('chartCanvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  @Input() datasets?: ChartDataset<'line'>[];
  @Input() labels?: string[];
  @Input() options?: ChartOptions;

  chart?: Chart;

  ngOnInit() {
    const chartItem: ChartItem = this.canvas.nativeElement;
    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.labels ?? [],
        datasets: this.datasets ?? []
      },
      options: this.options
    };

    this.chart = new Chart(chartItem, chartConfig);
  }
}
