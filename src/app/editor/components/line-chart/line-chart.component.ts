import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  chart!: Chart;
  @Input() props: any = {};
  constructor() { }

  ngOnInit(): void {
    this.initChart();
    console.log('lineChart:', this.props)
  }

  getData() {
      return this.props.csv ? {csv: this.props.csv} : {}
  }

  initChart() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      data: this.getData(),
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
