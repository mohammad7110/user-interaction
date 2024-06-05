import {Component, DebugElement} from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DynamicHostDirective } from './dynamic-host.directive';
import { ViewContainerRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appDynamicHost></div>`
})
class TestComponent {}

describe('DynamicHostDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicHostDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    directiveEl = fixture.debugElement.query(By.directive(DynamicHostDirective));
  });

  it('should create an instance of DynamicHostDirective', () => {
    expect(directiveEl).toBeDefined();
  });

  it('should have a ViewContainerRef instance', () => {
    const directiveInstance = directiveEl.injector.get(DynamicHostDirective);
    expect(directiveInstance.viewContainerRef).toBeDefined();
  });
});
