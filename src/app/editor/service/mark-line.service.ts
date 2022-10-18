import { Injectable } from '@angular/core';

@Injectable()
export class MarkLineService {
  public markLine:{x: null | number, y: null | number} = {x: null, y: null}
  constructor() { }

  setMarkLine(x: null | number, y: null | number) {
   this.markLine = {x, y}
  }

}
