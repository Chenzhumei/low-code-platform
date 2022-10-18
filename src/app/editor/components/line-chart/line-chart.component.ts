import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  chart!: Chart;
  constructor() { }

  ngOnInit(): void {
    this.initChart()
  }

  initChart() {
    this.chart = new Chart({
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [{
        type: 'line',
        data: [
            ['First', 29.9],
            ['Second', 71.5],
            ['Third', 106.4]
        ]
    }]
    })
  }

}
