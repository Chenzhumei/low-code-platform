import { Component, ComponentFactoryResolver, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { COPONENT_MAP, COPONENT_MAP_CONFIG } from '../components/components';
import { RenderDynamicDirective } from '../directive/render-dynamic.directive';
import { DragEventService } from '../service/drag-event.service';
import { EditorService } from '../service/editor.service';
import { MarkLineService } from '../service/mark-line.service';
import { SchemaService } from '../service/schema.service';

@Component({
  selector: 'app-dynamic-render',
  templateUrl: './dynamic-render.component.html',
  styleUrls: ['./dynamic-render.component.scss'],
  providers: [{provide: COPONENT_MAP_CONFIG, useValue: COPONENT_MAP}]
})
export class DynamicRenderComponent implements OnInit {
  _data: Record<string, any> = {};
  componentType = '';
  componentMap: any = {};
  @Input() set data(data: Record<string, any>) {
    this._data = data;
    this.componentType = data.type as string;
    this.componentType && this.createDynamicComponent(this.componentType)
  }

  @Input() blockIndex = -1;

  @ViewChild(RenderDynamicDirective, {static: true}) renderDynamic!:RenderDynamicDirective;

  dragState: Record<string, any> = {
    startX: 0, // 移动前 x 轴位置
    startY: 0, // 移动前 y 轴位置
    startPos: [], // 移动前 所有 focus block 的位置存储,
    dragging: false //
  }
  
  constructor(
    private cfr: ComponentFactoryResolver,
    private elf: ElementRef,
    @Inject(COPONENT_MAP_CONFIG) componentMap: any,
    public schemaService: SchemaService,
    private editorService: EditorService,
    private markLineService: MarkLineService,
    private dragEventService: DragEventService
  ) {
    this.componentMap = componentMap
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  
  }

  createDynamicComponent(type: string) {
   const component = this.cfr.resolveComponentFactory(this.componentMap[type]);
   this.renderDynamic.vcr.clear();
   const componentRef = this.renderDynamic.vcr.createComponent(
    component
   ) as any;
   componentRef.instance.props = this._data.props;
 
   const { offsetWidth, offsetHeight } = componentRef.location.nativeElement.parentNode;
   const { style } = this._data;
   style.width = offsetWidth;
   style.height = offsetHeight;
   if (this._data.alignCenter) {
      style.left = style.left - offsetWidth / 2;
      style.top = style.top - offsetHeight / 2;
      this._data.alignCenter = false;
    }
  }

  handleMouseDown(e: MouseEvent) {
    console.log('handleMouseDown')
    e.preventDefault();
    e.stopPropagation();
    if (e.shiftKey) {
      const { focus } = this.schemaService.blocksFocusInfo();
      // 当前只有一个被选中时，按住 shift 键不会切换 focus 状态
      this._data.focus = focus.length <= 1 ? true : !this._data.focus;
    } else {
      if (!this._data.focus) {
        this.schemaService.cleanBlocksFocus(true);
        this._data.focus = true;
      }
    }
    // this.editorService.forceUpdateEditor(true)
    this.handleBlockMouseMove(e)
  }


  handleBlockMouseMove (e: MouseEvent) {
    console.log('blockMouseMove')
    const { focus, unfocused } = this.schemaService.blocksFocusInfo();

    const lastSelectBlock = this.schemaService.schema.blocks[this.blockIndex];
    // 我们声明：B 代表最近一个选中拖拽的元素，A 则是对应的参照物，对比两者的位置
    const { width: BWidth, height: BHeight, left: BLeft, top: BTop } = lastSelectBlock.style;

    // 1、记录鼠标拖动前的位置信息，以及所有选中元素的位置信息
    this.dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: focus.map(({ style: { top, left } }) => ({ top, left })),
      // 用于实现 block 在画布上的辅助线
      startLeft: BLeft,
      startTop: BTop,
      // 找到其余 A block（unfocused）作为参照物时，参照物周围可能出现的 lines
      lines: (() => {
      const lines: {x: any[], y: any[]} = { x: [], y: [] }; // 计算横线的位置使用 y 存放；纵线的位置使用 x 存放。
      
      [...unfocused, {
         // 画布中心辅助线
          style: {
            top: 0,
            left: 0,
            width: this.schemaService.schema.container.width,
            height: this.schemaService.schema.container.height,
          }
      }].forEach(block => {
        const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block.style;
        // liney.showTop: （水平位置）辅助线显示位置；
        // liney.top: 拖拽元素 top 显示位置；
        // linex.showLeft: （垂直位置）辅助线显示位置；
        // linex.left: 拖拽元素 left 显示位置。

        // 水平横线显示的 5 种情况：
        lines.y.push({ showTop: ATop, top: ATop }); // 情况一：A和B 顶和顶对其。拖拽元素和A元素top一致时，显示这跟辅助线，辅助线的位置时 ATop
        lines.y.push({ showTop: ATop, top: ATop - BHeight }); // 情况二：A和B 顶对底
        lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 }); // 情况三：A和B 中对中
        lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }); // 情况四：A和B 底对顶
        lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight }); // 情况四：A和B 底对底

        // 垂直纵线显示的 5 种情况：
        lines.x.push({ showLeft: ALeft, left: ALeft }); // A和B 左对左
        lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }); // A和B 右对左
        lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 }); // A和B 中对中
        lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth }); // A和B 右对右
        lines.x.push({ showLeft: ALeft, left: ALeft - BWidth }); // A和B 左对右
      });
      
      // 假如画布上 unfocused 有两个，那么 lines.x 和 linex.y 分别存储了 10 条线位置信息
      return lines;
    })()
    };

    const blockMove = (e: MouseEvent) => {
      if (!this.dragState.dragging) {
        this.dragState.dragging = true;
        this.dragEventService.setDragEvent('startDrag'); // 记录开始拖拽移动
      }
      let { clientX: moveX, clientY: moveY } = e;
      // 计算鼠标拖动后，B block 最新的 left 和 top 值
      let left = moveX - this.dragState.startX + this.dragState.startLeft;
      let top = moveY - this.dragState.startY + this.dragState.startTop;
      let x = null, y = null;

      // 将当前 B block 移动的位置，和上面记录的 lines 进行一一比较，如果移动到的范围内有 A block 存在，显示对应的辅助线
      for (let i = 0; i < this.dragState.lines.x.length; i ++) {
        const { left: l, showLeft: s } = this.dragState.lines.x[i];
        if (Math.abs(l - left) < 5) { // 接近 5 像素距离时显示辅助线
          x = s;
          // 实现吸附
          moveX = this.dragState.startX - this.dragState.startLeft + l;
          break;
        }
      }
      for (let i = 0; i < this.dragState.lines.y.length; i ++) {
        const { top: t, showTop: s } = this.dragState.lines.y[i];
        if (Math.abs(t - top) < 5) { // 接近 5 像素距离时显示辅助线
          y = s;
          // 实现吸附
          moveY = this.dragState.startY - this.dragState.startTop + t;
          break;
        }
      }

      this.markLineService.setMarkLine(x, y);

      const durX = moveX - this.dragState.startX;
      const durY = moveY - this.dragState.startY;
    
      focus.forEach((block, index) => {
        block.style.top = this.dragState.startPos[index].top + durY;
        block.style.left = this.dragState.startPos[index].left + durX;
      })
    };

    const blockMouseUp = (e: MouseEvent) => {
      console.log('blockMouseUp')
      
      document.removeEventListener('mousemove', blockMove);
      document.removeEventListener('mouseup', blockMouseUp);

      if (this.dragState.dragging) {
        this.dragEventService.setDragEvent('endDrag');
      }

      this.markLineService.setMarkLine(null, null);
    }

    document.addEventListener('mousemove', blockMove);
    document.addEventListener('mouseup', blockMouseUp);
    
  };

}
