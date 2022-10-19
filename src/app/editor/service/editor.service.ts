import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorService {
  public forceUpdateEditor$ = new Subject<number>()

  constructor() { }

  forceUpdateEditor(updateBlockIndex: number) {
    this.forceUpdateEditor$.next(updateBlockIndex)
  }
}
