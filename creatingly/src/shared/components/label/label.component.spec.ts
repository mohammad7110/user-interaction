import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';
import {of} from "rxjs";
import {ResizableDirective} from "../../directives/resizable/resizable.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../../../services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {Renderer2} from "@angular/core";

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;
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
      declarations: [LabelComponent, ResizableDirective],
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
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
