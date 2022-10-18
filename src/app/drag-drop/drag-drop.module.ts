import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DragDrawComponent } from './drag-draw/drag-draw.component';
import { DragDropRoutingModule } from './drag-drop-routing.module';
import { ToolListComponent } from './tool-list/tool-list.component';
import { DragDirective } from './directives/drag.directive';
import { DropDirective } from './directives/drop.directive';



@NgModule({
  declarations: [
    IndexComponent,
    DragDrawComponent,
    ToolListComponent,
    DragDirective,
    DropDirective
  ],
  imports: [
    CommonModule,
    DragDropRoutingModule
  ],
  exports: [
   
  ]
})
export class DragDropModule { }
