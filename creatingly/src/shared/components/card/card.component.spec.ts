import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import {of} from "rxjs";
import {ResizableDirective} from "../../directives/resizable/resizable.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {MessageService} from "../../../services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {Renderer2} from "@angular/core";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
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
      declarations: [CardComponent, ResizableDirective],
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
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
