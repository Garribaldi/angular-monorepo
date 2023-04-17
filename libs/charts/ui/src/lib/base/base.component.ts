import { Component, Input } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'charts-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  @Input() chart?: Chart;
}
