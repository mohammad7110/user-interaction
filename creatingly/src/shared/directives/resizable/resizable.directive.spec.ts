import {Component, DebugElement} from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ResizableDirective } from './resizable.directive';
import { Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appResizable></div>`
})
class TestComponent {}

describe('ResizableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResizableDirective, TestComponent],
      providers: [Renderer2]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    directiveEl = fixture.debugElement.query(By.directive(ResizableDirective));
    renderer = fixture.debugElement.injector.get(Renderer2);
  });

  it('should create an instance of ResizableDirective', () => {
    expect(directiveEl).toBeDefined();
  });

  it('should create resize handles on init', () => {
    const handles = directiveEl.nativeElement.querySelectorAll('#handler');
    expect(handles.length).toBe(4);
  });

  it('should update the style of the element during resizing', () => {
    const directiveInstance = directiveEl.injector.get(ResizableDirective);
    spyOn(directiveInstance.resizeMove, 'emit');
    const handle = directiveEl.nativeElement.querySelector('#handler');
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 200 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(directiveInstance.resizeMove.emit).toHaveBeenCalled();
  });

  it('should emit resizeStart, resizeMove, and resizeEnd events', () => {
    const directiveInstance = directiveEl.injector.get(ResizableDirective);
    spyOn(directiveInstance.resizeStart, 'emit');
    spyOn(directiveInstance.resizeMove, 'emit');
    spyOn(directiveInstance.resizeEnd, 'emit');

    const handle = directiveEl.nativeElement.querySelector('#handler');
    handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 100 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 200 }));
    document.dispatchEvent(new MouseEvent('mouseup'));

    expect(directiveInstance.resizeStart.emit).toHaveBeenCalled();
    expect(directiveInstance.resizeMove.emit).toHaveBeenCalled();
    expect(directiveInstance.resizeEnd.emit).toHaveBeenCalled();
  });

  it('should apply the correct styles based on resizeDisabled input', () => {
    const directiveInstance = directiveEl.injector.get(ResizableDirective);

    const handle = directiveEl.nativeElement.querySelector('#handler');

    directiveInstance.resizeDisabled = false;
    fixture.detectChanges();

    expect(handle.style.border).toBe('2px solid rgb(0, 187, 255)');
  });
});
