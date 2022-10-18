import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type DragEvent = 'startDrag' | 'endDrag';

@Injectable()
export class DragEventService {
  public startDrag$ = new Subject<'startDrag'>()
  public endDrag$ = new Subject<'endDrag'>()
  constructor() { }

  setDragEvent(eventType: DragEvent) {
    if (eventType === 'startDrag') {
      this.startDrag$.next(eventType)
    }

    if (eventType === 'endDrag') {
      this.endDrag$.next(eventType)
    }
    
  }

}
