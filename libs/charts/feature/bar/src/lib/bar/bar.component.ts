import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem } from "chart.js/auto";

@Component({
  selector: 'charts-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {

  @ViewChild('chartCanvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;

  @Input() config!: ChartConfiguration<'bar'>;

  ngOnInit() {
    const chartItem: ChartItem = this.canvas.nativeElement;
    this.chart = new Chart(chartItem, this.config);
  }
}
