import { Component, Inject, InjectionToken, Injector, OnInit } from '@angular/core';
import { COPONENT_LIST, COPONENT_LIST_CONFIG } from '../../components/components';
import { CurrentMaterialService } from '../../service/current-material.service';
import { DragEventService } from '../../service/drag-event.service';

@Component({
  selector: 'app-visual-editor-menu',
  templateUrl: './visual-editor-menu.component.html',
  styleUrls: ['./visual-editor-menu.component.scss'],
  providers: [{provide: COPONENT_LIST_CONFIG, useValue: COPONENT_LIST}]
})
export class VisualEditorMenuComponent implements OnInit {
  componentList: any[] = []
  constructor(
    @Inject(COPONENT_LIST_CONFIG) componentList: any[],
    private currentMaterialService: CurrentMaterialService,
    private dragEventService: DragEventService
  ) { 
    this.componentList = componentList
  }

  ngOnInit(): void {
  }

  onDragStart(e: MouseEvent, component:any) {
    this.currentMaterialService.set(component);
    this.dragEventService.setDragEvent('startDrag');
  }



}
