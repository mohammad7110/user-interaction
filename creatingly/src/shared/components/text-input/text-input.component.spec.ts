import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TextInputComponent} from './text-input.component';
import {MessageService} from '../../../services/message/message.service';
import {MatDialog} from '@angular/material/dialog';
import {Renderer2} from '@angular/core';
import {of} from 'rxjs';
import {ResizableDirective} from "../../directives/resizable/resizable.directive";
import {ReactiveFormsModule} from "@angular/forms";


describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    // Create a mock MessageService
    const messageServiceMock = {
      notification: {
        subscribe: () => {
        }
      },
      sendMessage: jasmine.createSpy('sendMessage') // Optionally mock the sendMessage method
    };

    // Create a mock MatDialog
    const matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({afterClosed: () => of()}) // Mock the open method
    };

    // Create a mock Renderer2
    const rendererMock = jasmine.createSpyObj('Renderer2', ['listen']);

    await TestBed.configureTestingModule({
      declarations: [TextInputComponent, ResizableDirective],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: MessageService, useValue: messageServiceMock}, // Provide the mock MessageService
        {provide: MatDialog, useValue: matDialogMock}, // Provide the mock MatDialog
        {provide: Renderer2, useValue: rendererMock} // Provide the mock Renderer2
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
