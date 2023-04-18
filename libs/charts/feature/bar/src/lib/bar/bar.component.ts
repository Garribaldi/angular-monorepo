import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset, ChartItem, ChartOptions } from "chart.js/auto";

@Component({
  selector: 'charts-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {

  @ViewChild('chartCanvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  @Input() datasets?: ChartDataset<'bar'>[];
  @Input() labels?: string[];
  @Input() options?: ChartOptions;

  chart?: Chart;

  ngOnInit() {
    const chartItem: ChartItem = this.canvas.nativeElement;
    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.labels ?? [],
        datasets: this.datasets ?? []
      },
      options: this.options
    };

    this.chart = new Chart(chartItem, chartConfig);
  }
}
