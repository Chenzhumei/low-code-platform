import { ChangeDetectorRef, Component, HostListener, InjectionToken, Injector, OnInit } from '@angular/core';
import { CurrentMaterialService } from '../../service/current-material.service';
import * as _ from 'lodash';
import { EditorService } from '../../service/editor.service';
import { SchemaService } from '../../service/schema.service';
import { MarkLineService } from '../../service/mark-line.service';
import { DragEventService } from '../../service/drag-event.service';
export const token = new InjectionToken<string>('')
@Component({
  selector: 'app-visual-editor-content',
  templateUrl: './visual-editor-content.component.html',
  styleUrls: ['./visual-editor-content.component.scss']
})
export class VisualEditorContentComponent implements OnInit {
  constructor(
    private injector: Injector,
    private currentMaterialService: CurrentMaterialService,
    private cdr: ChangeDetectorRef,
    private editorService:EditorService,
    public schemaService: SchemaService,
    public markLineService: MarkLineService,
    private dragEventService: DragEventService
    ) { }

  ngOnInit(): void {
    this.editorService.forceUpdateEditor$.subscribe((isForceUpdate: boolean) => {
      if (isForceUpdate) {
        this.cdr.detectChanges()
        console.log('editor update...')
      }
    })
  }

  createInjector(item: any) {
    return Injector.create({
     providers: [{provide: token, useValue: item}],
     parent: this.injector
    })
  }


  handleDragenter(e:any) {
    e.dataTransfer.dropEffect = 'move';
  }


  handleDragover(e:MouseEvent) {
    e.preventDefault();
  }
 
  
  handleDragleave(e:any) {
    e.dataTransfer.dropEffect = 'none';
  }

 
  handleDrop(e: MouseEvent) {
      e.preventDefault();
      const { offsetX, offsetY } = e;
      this.schemaService.schema.blocks.push({
        alignCenter: true,
        focus: false,
        style: {
          width: undefined,
          height: undefined,
          left: offsetX,
          top: offsetY,
        },
        zIndex: 1,
        ... this.currentMaterialService.currentMatirialComponent
      });
      this.currentMaterialService.currentMatirialComponent = null;
       this.dragEventService.setDragEvent('endDrag');
    }

  handleClickCanvas(e: any) {
    e.stopPropagation();
    this.schemaService.cleanBlocksFocus(true);
    this.schemaService.setLateastSelectedBlock(null);
  }

}
