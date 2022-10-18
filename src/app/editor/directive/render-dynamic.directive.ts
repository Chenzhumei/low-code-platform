import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRenderDynamic]'
})
export class RenderDynamicDirective {

  constructor(public vcr: ViewContainerRef) { }

}
