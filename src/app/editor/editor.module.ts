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
import { TextComponent } from './components/text/text.component';
import { ImageComponent } from './components/image/image.component';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {ColorPickerModule} from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';


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
    RenderDynamicDirective,
    TextComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule,
    ColorPickerModule,
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
