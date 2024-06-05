import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FeatureGeneric} from './feature-generic.component';
import {ChangeTextDialogComponent} from '../change-text-dialog/change-text-dialog.component';
import {MessageService} from '../../../services/message/message.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {of} from 'rxjs';
import {Renderer2, ElementRef} from '@angular/core';
import {CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';
import {ConfigFeatureMessage} from '../../../models/messages/config-feature-message';
import {LockFeatureMessage} from '../../../models/messages/lock-feature-message';
import {DataFeatureMessage} from '../../../models/messages/data-feature-message';
import {RemoveFeatureMessage} from '../../../models/messages/remove-feature-message';

describe('FeatureGeneric', () => {
  let component: FeatureGeneric;
  let fixture: ComponentFixture<FeatureGeneric>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let rendererSpy: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    const messageServiceMock = {
      notification: {
        subscribe: () => {
        }
      },
      sendMessage: jasmine.createSpy('sendMessage') // Optionally mock the sendMessage method
    };

    const dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue({afterClosed: () => of()});

    const renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    await TestBed.configureTestingModule({
      declarations: [FeatureGeneric, ChangeTextDialogComponent],
      providers: [
        {provide: MessageService, useValue: messageServiceMock},
        {provide: MatDialog, useValue: dialog},
        {provide: Renderer2, useValue: renderer}
      ],
      imports: [ReactiveFormsModule, MatDialogModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureGeneric);
    component = fixture.componentInstance;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    rendererSpy = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
    component.remove = jasmine.createSpyObj('EventEmitter', ['emit']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle received notifications', () => {
    spyOn(component as any, 'handleLockMessage').and.callThrough();

    const configMessage = new ConfigFeatureMessage(component.id, {x: 10, y: 20});
    const lockMessage = new LockFeatureMessage(component.id, true);
    const dataValue = {
      backgroundColor: "rgba(255, 255, 255, 1)",
      bold: false,
      color: "#f43e3e",
      fontSize: 16,
      label: "label",
      placeHolder: "input",
      src: "",
      text: "click",
      value: "asdasd",
      borderRadius:4
    }
    const dataMessage = new DataFeatureMessage(component.id, dataValue);
    const removeMessage = new RemoveFeatureMessage(component.id);

    (component as any).receivedNotification(configMessage);
    (component as any).receivedNotification(lockMessage);
    (component as any).receivedNotification(dataMessage);
    (component as any).receivedNotification(removeMessage);

    expect(component.configs).toEqual(configMessage.config);
    expect((component as any).handleLockMessage).toHaveBeenCalledWith(lockMessage);
    expect(component.formGroup.value).toEqual(dataMessage.data);
    expect(component.remove.emit).toHaveBeenCalled();
  });

  it('should handle drag start', () => {
    spyOn(component as any, 'sendDataMessage').and.callThrough();

    component.dragStart();

    expect((component as any).sendDataMessage).toHaveBeenCalledWith(true);
    expect((component as any).startX).toBe(component.configs.x);
    expect((component as any).startY).toBe(component.configs.y);
  });

  it('should handle drag move', () => {
    spyOn(component as any, 'sendConfigMessage').and.callThrough();
    const event = {
      source: {
        getFreeDragPosition: () => ({x: 10, y: 20})
      }
    } as CdkDragMove<ElementRef>;

    component.move(event);

    expect((component as any).startX).toBe(component.configs.x + 10);
    expect((component as any).startY).toBe(component.configs.y + 20);
    expect((component as any).sendConfigMessage).toHaveBeenCalledWith(jasmine.objectContaining({
      x: (component as any).startX,
      y: (component as any).startY
    }));
  });

  it('should handle drag end', () => {
    spyOn(component as any, 'sendConfigMessage').and.callThrough();
    spyOn(component as any, 'sendLock').and.callThrough();

    const nativeElement = document.createElement('div'); // Create a dummy native element
    const event = {
      source: {
        getFreeDragPosition: () => ({ x: 10, y: 20 }),
        element: { nativeElement}, // Assign the dummy native element
        reset: () => {}
      }
    } as unknown as CdkDragEnd<ElementRef<any>>;
    const beforeX = component.configs.x;
    const beforeY = component.configs.y;
    component.drop(event);


    expect(component.configs.x).toBe(beforeX+ 10);
    expect(component.configs.y).toBe(beforeY + 20);
    expect((component as any).sendConfigMessage).toHaveBeenCalledWith(component.configs);
    expect((component as any).sendLock).toHaveBeenCalledWith(false);
  });


  it('should handle resize start', () => {
    spyOn(component as any, 'sendLock').and.callThrough();

    component.onResizeStart();

    expect((component as any).sendLock).toHaveBeenCalledWith(true);
  });

  it('should handle resize move', () => {
    spyOn(component as any, 'sendConfigMessage').and.callThrough();
    const event = {width: 100, height: 200, left: 10, top: 20};

    component.onResizeMove(event);

    expect(component.configs.width).toBe(event.width);
    expect(component.configs.height).toBe(event.height);
    expect(component.configs.x).toBe(event.left);
    expect(component.configs.y).toBe(event.top);
    expect((component as any).sendConfigMessage).toHaveBeenCalledWith(component.configs);
  });

  it('should handle resize end', () => {
    spyOn(component as any, 'sendLock').and.callThrough();

    component.onResizeEnd();

    expect((component as any).sendLock).toHaveBeenCalledWith(false);
  });

  it('should send remove feature message', () => {
    component.removeFeature();

    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(jasmine.any(RemoveFeatureMessage));
    expect(component.remove.emit).toHaveBeenCalled();
  });

  it('should open change data config dialog', () => {
    const forms = [{label: 'Test', control: new FormControl('')}];

    component.changeDataConfig(forms);

    expect(dialogSpy.open).toHaveBeenCalledWith(ChangeTextDialogComponent, {
      data: forms
    });
  });

  it('should send lock message', () => {
    const lock = true;

    (component as any).sendLock(lock);

    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(jasmine.any(LockFeatureMessage));
  });

  it('should send data message', () => {
    const data = {value: 'test'};

    (component as any).sendDataMessage(data);

    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(jasmine.any(DataFeatureMessage));
  });

  it('should handle lock message', () => {
    const message = new LockFeatureMessage(component.id, true);

    (component as any).handleLockMessage(message);

    expect(component.lock).toBe(true);
    expect(component.formGroup.disabled).toBe(true);

    (message as any).lock = false;
    (component as any).handleLockMessage(message);

    expect(component.lock).toBe(false);
    expect(component.formGroup.disabled).toBe(false);
  });

  it('should send config message', () => {
    const config = {x: 10, y: 20};

    (component as any).sendConfigMessage(config);

    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(jasmine.any(ConfigFeatureMessage));
  });
});
