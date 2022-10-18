import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Input() componentType: string = '';
  // 拖动占位符
  @Input() dragPlaceholder!: HTMLCanvasElement;
  el: ElementRef;

  canvasConfig = {
      width: 100,
      height: 100,
  };


  constructor(el: ElementRef) {
      this.el = el;
      this.el.nativeElement.setAttribute('draggable', true);
      this.el.nativeElement.style.cursor = 'move';
  }

  @HostListener('dragstart', ['$event'])
  dragstart(e:any) {
      const dt = e.dataTransfer;
      dt.effectAllowed = 'copy';
      dt.setData('text/plain', this.componentType);

      this.dragWidthCustomerImage(e);
  }

  // 拖拽完成
  @HostListener('dragend', ['$event'])
  dragend(e:any) {
      this.resetCanvas(this.dragPlaceholder);
  }

  dragWidthCustomerImage(event:any) {
      this.drawCanvas(this.dragPlaceholder, this.componentType);
      event.dataTransfer.setDragImage(this.dragPlaceholder, 25, 25);
  }

  drawCanvas(canvasEl: HTMLCanvasElement, text: string) {
      const ratio = this.getDpi();
      canvasEl.style.width = this.canvasConfig.width + 'px';
      canvasEl.style.height = this.canvasConfig.height + 'px';

      canvasEl.width = this.canvasConfig.width * ratio;
      canvasEl.height = this.canvasConfig.height * ratio;
      const context = canvasEl.getContext('2d') as CanvasRenderingContext2D;
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      context.fillStyle = '#999';
      context.fillRect(0, 0, canvasEl.width, canvasEl.height);
      // 放置文字
      context.fillStyle = '#fff';
      const fontSize = 14;
      context.font = `${fontSize * ratio}px Arial`;
      context.fillText(text, 0, canvasEl.height / 2);
  }

  resetCanvas(canvasEl: any) {
      canvasEl.style.width = '0px';
      canvasEl.style.height = '0px';
      canvasEl.width = 0;
      canvasEl.height = 0;
  }

  getDpi() {
    return window.devicePixelRatio || 1;
}
}

