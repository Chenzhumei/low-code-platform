import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { VisualEditorHeaderComponent } from './layout/visual-editor-header/visual-editor-header.component';
import { VisualEditorContentComponent } from './layout/visual-editor-content/visual-editor-content.component';
import { VisualEditorMenuComponent } from './layout/visual-editor-menu/visual-editor-menu.component';
import { VisualEditorPropsComponent } from './layout/visual-editor-props/visual-editor-props.component';
import { ButtonComponent } from './components/button/button.component';
import {AccordionModule} from 'primeng/accordion';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartModule } from 'angular-highcharts';
import {ButtonModule} from 'primeng/button';
import { DynamicRenderComponent } from './dynamic-render/dynamic-render.component';
import { RenderDynamicDirective } from './directive/render-dynamic.directive';
import { EditorService } from './service/editor.service';
import { SchemaService } from './service/schema.service';
import { MarkLineService } from './service/mark-line.service';
import { CommandsService } from './service/commands.service';
import { DragEventService } from './service/drag-event.service';



@NgModule({
  declarations: [
    EditorComponent,
    VisualEditorHeaderComponent,
    VisualEditorContentComponent,
    VisualEditorMenuComponent,
    VisualEditorPropsComponent,
    ButtonComponent,
    LineChartComponent,
    DynamicRenderComponent,
    RenderDynamicDirective
  ],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    AccordionModule,
    EditorRoutingModule
  ],
  providers:[
    EditorService,
    SchemaService,
    MarkLineService,
    CommandsService,
    DragEventService
  ]
})
export class EditorModule { }
