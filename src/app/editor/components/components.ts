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
          label: '显示文本'
        },
        size: {
          type: 'select',
          label: '字体大小',
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
          label: '字体颜色'
        }
      },
      props: {
        text: '输入文本',
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
        src: {
          type: 'input',
          label: '地址'
        }
      },
      props: {
        src: 'assets/img/image.png'
      }
    },
    {
      name: 'button',
      type: 'ButtonComponent',
      icon: 'pi pi-stop',
      component: ButtonComponent,
      propsConfig: {
        text: {
          type: 'input',
          label: '显示文本'
        },
        size: {
          type: 'select',
          label: '按钮大小',
          options: [
            {label: '基础', val: 'primary'},
            {label: '成功', value: 'success'},
            {label: '失败', value: 'fail'},
            {label: '警告', value: 'warning'},
            {label: '提示', value: 'info'}
          ]
        },
      },
      props: {
        text: '默认按钮',
        size: 'primary'
      }
    },
    {
        name: 'lineChart',
        type: 'LineChartComponent',
        icon: 'pi pi-chart-line',
        component: LineChartComponent,
        propsConfig: {
          data: {
            type: 'input',
            label: '数据'
          },
          csv: {
            type: 'input',
            label: 'csv上传'
          }
        },
        props: {
          data: '',
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