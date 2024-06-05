import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent } from './image.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { MessageService } from '../../../services/message/message.service';
import { of } from 'rxjs';
import {ResizableDirective} from "../../directives/resizable/resizable.directive";

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    const messageService = jasmine.createSpyObj('MessageService', ['sendMessage']);
    messageService.notification = of();

    const dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue({ afterClosed: () => of() });

    const renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    await TestBed.configureTestingModule({
      declarations: [ImageComponent,ResizableDirective],
      providers: [
        { provide: MessageService, useValue: messageService },
        { provide: MatDialog, useValue: dialog },
        { provide: Renderer2, useValue: renderer }
      ],
      imports: [ReactiveFormsModule, MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    rendererSpy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change image', () => {
    const file = new File(['dummy image'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as any;

    component.changeImage(event);

    const reader = new FileReader();
    reader.onload = () => {
      expect(component.formGroup.get('src')?.value).toEqual(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
});
