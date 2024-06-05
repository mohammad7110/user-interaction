import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonComponent} from './button.component';
import {MessageService} from '../../../services/message/message.service';
import {MatDialog} from '@angular/material/dialog';
import {Renderer2} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {ResizableDirective} from "../../directives/resizable/resizable.directive";

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const dialog = jasmine.createSpyObj('MatDialog', ['open']);
  dialog.open.and.returnValue({afterClosed: () => of()});
  // Mock MessageService
  const messageServiceMock = {
    notification: {
      subscribe: () => {
      }
    },
    sendMessage: jasmine.createSpy('sendMessage') // Optionally mock the sendMessage method
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, ResizableDirective],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: MessageService, useValue: messageServiceMock}, // Provide the mock MessageService
        {provide: MatDialog, useValue: dialog},
        Renderer2
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
