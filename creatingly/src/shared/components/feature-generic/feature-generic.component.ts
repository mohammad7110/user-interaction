import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {ElementRef, Renderer2} from "@angular/core";

export class FeatureGeneric {

  protected configs: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  }

  constructor(public renderer: Renderer2) {
  }


  move(event: CdkDragMove<ElementRef>) {
    // console.log($event)
    // console.log(event.source.getFreeDragPosition())
    // this.configs.x
    // this.configs.x ={
    //
    // }
  }

  drop(event: CdkDragEnd<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.configs.x += sourcePosition.x;
    this.configs.y += sourcePosition.y;
    this.renderer.setStyle(event.source.element.nativeElement, 'transform', null);
    event.source.reset();
  }


  onResizeMove($event: { width: number; height: number; left: number; top: number }) {

  }

  onResizeEnd() {

  }

  onResizeStart() {

  }

}
