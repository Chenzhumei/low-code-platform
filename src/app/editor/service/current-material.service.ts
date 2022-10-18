import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentMaterialService {
  currentMatirialComponent: any;
  constructor() { }

  set(component: any) {
     this.currentMatirialComponent = component;
  }
}
