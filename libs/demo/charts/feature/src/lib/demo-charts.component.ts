import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js/auto";
import { ChartEmitValue } from "@local/charts/feature";

@Component({
  selector: 'local-demo-demo-charts',
  templateUrl: './demo-charts.component.html',
  styleUrls: ['./demo-charts.component.scss'],
})
export class DemoChartsComponent {
  testPieLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',];
  testPieDatasets = [
    {
      data: [50, 60, 70, 180, 190, 170, 210, 200]
    }
  ];
  testPieOptions: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }
    }
  };

  testLabels = ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',];
  testDatasets = [
    {
      label: "Sales",
      data: [467, 576, 572, 79, 92, 574, 573, 576],
      backgroundColor: 'blue'
    },
    {
      label: "Profit",
      data: [542, 542, 536, 327, 17, 0.00, 538, 541],
      backgroundColor: 'limegreen'
    }
  ];
  testOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  testBarChart: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: this.testLabels,
      datasets: this.testDatasets
    },
    options: this.testOptions
  };

  updateData(values: ChartEmitValue) {
    console.log(values);
  }
}
