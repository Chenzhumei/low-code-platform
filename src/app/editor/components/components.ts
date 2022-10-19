import { InjectionToken } from "@angular/core";
import { ButtonComponent } from "./button/button.component";
import { ImageComponent } from "./image/image.component";
import { LineChartComponent } from "./line-chart/line-chart.component";
import { TextComponent } from "./text/text.component";

export const COPONENT_LIST = [
    {
      name: 'text',
      type: 'TextComponent',
      icon: 'pi pi-language',
      component: TextComponent,
      props: {
        context: '文本'
      }
    },
    {
      name: 'image',
      type: 'ImageComponent',
      icon: 'pi pi-images',
      component: ImageComponent,
      props: {
        alt: '图片',
        src: ''
      }
    },
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
          data: [],
          csv: ''
        }
    }
]

export const COPONENT_MAP = {
  'ButtonComponent': ButtonComponent,
  'ImageComponent': ImageComponent,
  'TextComponent': TextComponent,
  'LineChartComponent': LineChartComponent
}


export const COPONENT_LIST_CONFIG = new InjectionToken<string>('componentList');
export const COPONENT_MAP_CONFIG = new InjectionToken<string>('componentMap');