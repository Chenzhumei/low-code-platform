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
      propsConfig: {
        text: {
          type: 'input',
          label: 'Text'
        },
        size: {
          type: 'select',
          label: 'Font Size',
          options: [
            {label: '12px', value: '12px'},
            {label: '14px', value: '14px'},
            {label: '16px', value: '16px'},
            {label: '18px', value: '18px'},
            {label: '20px', value: '20px'},
            {label: '22px', value: '22px'}
          ]
        },
        color: {
          type: 'color',
          label: 'Font Color'
        }
      },
      props: {
        text: 'text',
        size: '12px',
        color: '#000'
      }
    },
    {
      name: 'image',
      type: 'ImageComponent',
      icon: 'pi pi-images',
      component: ImageComponent,
      propsConfig: {
        width: {
          type: 'input',
          label: 'Width'
        },
        height: {
          type: 'input',
          label: 'Height'
        },
        src: {
          type: 'input',
          label: 'Image Source'
        }
      },
      props: {
        src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668844412&t=b24e267bd7cbf6f6c85ed973f04160ac',
        width: 100,
        height: 100
      }
    },
    {
        name: 'lineChart',
        type: 'LineChartComponent',
        icon: 'pi pi-chart-line',
        component: LineChartComponent,
        propsConfig: {
          chartTitle: {
            type: 'input',
            label: 'Title'
          },
          data: {
            type: 'select',
            label: 'System Data',
            options: [
              {label: 'select', value: ''},
              {label: 'ETR', value: 'ETR'},
              {label: 'Tier', value: 'Tier'},
              {label: 'Taxionomy', value: 'Taxionomy'}
           ]
          },
          csv: {
            type: 'csv-upload',
            label: 'CSV Upload'
          }
        },
        props: {
          data: '',
          csv: '',
          chartTitle: 'Title'
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