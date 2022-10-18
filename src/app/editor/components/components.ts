import { InjectionToken } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { LineChartComponent } from "./line-chart/line-chart.component";

export const COPONENT_LIST = [
    {
        name: 'button',
        type: 'ButtonComponent',
        icon: 'pi pi-stop',
        component: ButtonComponent,
        props: {
          context: '按钮'
        }
    },
    {
        name: 'lineChart',
        type: 'LineChartComponent',
        icon: 'pi pi-chart-line',
        component: LineChartComponent,
        props: {
          data: []
        }
    }
]

export const COPONENT_MAP = {
  'ButtonComponent': ButtonComponent,
  'LineChartComponent': LineChartComponent
}


export const COPONENT_LIST_CONFIG = new InjectionToken<string>('componentList');
export const COPONENT_MAP_CONFIG = new InjectionToken<string>('componentMap');