import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EditorService {
  public forceUpdateEditor$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  forceUpdateEditor(isUpdate: boolean) {
    this.forceUpdateEditor$.next(isUpdate)
  }
}
