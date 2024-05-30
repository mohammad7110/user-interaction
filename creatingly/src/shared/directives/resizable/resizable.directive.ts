import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';


enum ResizeDirection {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left'
}

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements OnInit {

  @Output() resizeEnd = new EventEmitter<{ width: number, height: number, left: number, top: number }>();
  @Output() resizeMove = new EventEmitter<{ width: number, height: number, left: number, top: number }>();
  @Output() resizeStart = new EventEmitter();


  private _resizeDisabled: boolean = false;

  @Input() set resizeDisabled(value: boolean) {
    this._resizeDisabled = value;
    for (let i = 0; i < this.el.nativeElement.children.length; i++) {
      const element = this.el.nativeElement.children.item(i);
      if (element && element.id === 'handler') {
        this.renderer.setStyle(element, 'border', this.resizeDisabled ? '2px solid #ff4081' : '2px solid rgb(0, 187, 255)')
      }
    }
  }

  get resizeDisabled(): boolean {
    return this._resizeDisabled;
  }

  private resizing = false;
  private startX: number = 0;
  private startY: number = 0;
  private startWidth: number = 0;
  private startHeight: number = 0;
  private currentHandle?: HTMLElement;
  private startTop: number = 0;
  private startLeft: number = 0;
  private mouseMoveListener: () => void = () => {
  };
  private mouseUpListener: () => void = () => {
  };


  constructor(private el: ElementRef, private renderer: Renderer2) {
  }


  private createHandles(): void {
    const handles: Array<ResizeDirection> = [ResizeDirection.TOP_LEFT, ResizeDirection.TOP_RIGHT, ResizeDirection.BOTTOM_RIGHT, ResizeDirection.BOTTOM_LEFT];
    handles.forEach(handle => this.createHandle(handle));
  }

  private createHandle(position: ResizeDirection): void {
    const handle = this.renderer.createElement('span');
    this.renderer.setAttribute(handle, 'id', 'handler');
    this.renderer.setStyle(handle, 'position', 'absolute');
    this.renderer.setStyle(handle, 'width', '10px');
    this.renderer.setStyle(handle, 'height', '10px');
    this.renderer.setStyle(handle, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(handle, 'border-radius', '50%');
    this.renderer.setStyle(handle, 'top', position === ResizeDirection.TOP_LEFT || position === ResizeDirection.TOP_RIGHT ? '0' : '100%');
    this.renderer.setStyle(handle, 'left', position === ResizeDirection.BOTTOM_LEFT || position === ResizeDirection.TOP_LEFT ? '0' : '100%');
    this.renderer.setStyle(handle, 'background', 'transparent');
    this.renderer.setStyle(handle, 'border', this.resizeDisabled ? '2px solid #ff4081' : '2px solid rgb(0, 187, 255)')
    this.renderer.setStyle(handle, 'cursor', this.getCursor(position));
    this.renderer.setStyle(handle, position, '0');
    this.renderer.appendChild(this.el.nativeElement, handle);

    this.renderer.listen(handle, 'mousedown', (event) => this.onMouseDown(event, position));
  }

  private getCursor(position: ResizeDirection): string {
    switch (position) {
      case ResizeDirection.TOP_RIGHT:
      case ResizeDirection.BOTTOM_LEFT:
        return 'nesw-resize';
      case ResizeDirection.TOP_LEFT:
      case ResizeDirection.BOTTOM_RIGHT:
        return 'nwse-resize';
      default:
        return 'default';
    }
  }

  private onMouseDown(event: MouseEvent, position: ResizeDirection): void {
    if (this.resizeDisabled) {
      return;
    }
    this.resizeStart.emit();
    event.preventDefault();
    this.resizing = true;
    this.currentHandle = event.target as HTMLElement;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.startHeight = this.el.nativeElement.offsetHeight;
    this.startTop = this.el.nativeElement.offsetTop;
    this.startLeft = this.el.nativeElement.offsetLeft;
    // Remove existing listeners if they exist
    if (this.mouseMoveListener) this.mouseMoveListener();
    if (this.mouseUpListener) this.mouseUpListener();

    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e) => this.onMouseMove(e, position));
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
  }

  private onMouseMove(event: MouseEvent, position: ResizeDirection): void {
    if (this.resizeDisabled) {
      return;
    }
    if (!this.resizing) {
      return;
    }

    let width = this.startWidth;
    let height = this.startHeight;
    let top = this.startTop;
    let left = this.startLeft;
    switch (position) {
      case ResizeDirection.BOTTOM_RIGHT:
        height = this.startHeight + (event.clientY - this.startY);
        width = this.startWidth + (event.clientX - this.startX);
        break;
      case ResizeDirection.BOTTOM_LEFT:
        height = this.startHeight + (event.clientY - this.startY);
        width = this.startWidth - (event.clientX - this.startX);
        left = this.startLeft + (event.clientX - this.startX);
        break;
      case ResizeDirection.TOP_RIGHT:
        height = this.startHeight - (event.clientY - this.startY);
        width = this.startWidth + (event.clientX - this.startX);
        top = this.startTop + (event.clientY - this.startY);
        break;
      case ResizeDirection.TOP_LEFT:
        height = this.startHeight - (event.clientY - this.startY);
        top = this.startTop + (event.clientY - this.startY)
        width = this.startWidth - (event.clientX - this.startX);
        left = this.startLeft + (event.clientX - this.startX);
        break;
    }
    this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${height}px`);
    this.resizeMove.emit({
      width: this.el.nativeElement.offsetWidth, height: this.el.nativeElement.offsetHeight,
      top: this.el.nativeElement.offsetTop, left: this.el.nativeElement.offsetLeft
    });
  }

  private onMouseUp(): void {
    if (this.resizeDisabled) {
      return;
    }
    if (this.resizing) {
      this.resizing = false;
      this.resizeEnd.emit({
        width: this.el.nativeElement.offsetWidth, height: this.el.nativeElement.offsetHeight,
        top: this.el.nativeElement.offsetTop, left: this.el.nativeElement.offsetLeft
      });
      if (this.mouseMoveListener) this.mouseMoveListener();
      if (this.mouseUpListener) this.mouseUpListener();
    }
  }

  ngOnInit(): void {
    this.createHandles();

  }
}





