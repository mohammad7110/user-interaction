import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {DynamicHostDirective} from '../shared/directives/dynamic-host/dynamic-host.directive';
import {MessageService} from '../services/message/message.service';
import {of} from 'rxjs';
import {ComponentFactoryResolver, ComponentRef} from '@angular/core';
import {FeatureList, Feature, getFeatureById} from '../models/features';
import {NewFeatureMessage} from '../models/messages/new-feature-message';
import {ListSyncMessage} from '../models/messages/list-sync-message';
import {LeftSideBarComponent} from "./left-side-bar/left-side-bar.component";
import {MaterialModule} from "../shared/material/material.module";
import {TextInputComponent} from "../shared/components/text-input/text-input.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(async () => {
    const messageServiceMock = {
      notification: {
        subscribe: () => {
        }
      },
      sendMessage: jasmine.createSpy('sendMessage') // Optionally mock the sendMessage method
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DynamicHostDirective, // Declare the directive here
        LeftSideBarComponent,
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        {provide: MessageService, useValue: messageServiceMock}, // Provide the mock MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create a component', () => {
    const action = {
      title: 'Input',
      // class: 'text-input',
      component: TextInputComponent,
      componentId: '1',
    };
    const componentRef = (component as any).createComponent(action);
    expect(componentRef).toBeTruthy();
  });

  it('should call selectAction and createComponent', () => {
    spyOn(component as any, 'createComponent').and.callThrough();
    spyOn(component as any, 'initializeComponent').and.callThrough();
    spyOn(component as any, 'setupComponentRemoval').and.callThrough();
    spyOn(component as any, 'handleNewFeature').and.callThrough();

    const action = {
      title: 'Input',
      component: TextInputComponent,
      componentId: '1',
    };
    const config = {
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    }

    component.selectAction(action, true, config);
    expect((component as any).createComponent).toHaveBeenCalledWith(action);
    expect((component as any).initializeComponent).toHaveBeenCalled();
    expect((component as any).setupComponentRemoval).toHaveBeenCalled();
    expect((component as any).handleNewFeature).toHaveBeenCalled();
  });


  it('should initialize a component', () => {
    const action = {
      title: 'Input',
      component: TextInputComponent,
      componentId: '1',
    };

    const componentRef = (component as any).createComponent(action);
    (component as any).initializeComponent(componentRef, {
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {value:'test'}
    });
    expect(componentRef.instance.id).toBe('testInstanceId');
    expect(componentRef.instance.configs).toEqual({x: 0, y: 0});
    expect(componentRef.instance.lock).toBe(false);
    const formGroupValue = componentRef.instance.formGroup.value;
    expect(formGroupValue.value).toBe('test');

  });

  it('should handle received notifications', () => {
    spyOn(component as any, 'syncFeatureList').and.callThrough();
    spyOn(component as any, 'addNewFeature').and.callThrough();

    const syncMessage = new ListSyncMessage([{
      componentId: '1',
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    }]);
    const newFeatureMessage = new NewFeatureMessage({
      componentId: '2',
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    });

    (component as any).receivedNotification(syncMessage);
    (component as any).receivedNotification(newFeatureMessage);
    expect((component as any).syncFeatureList).toHaveBeenCalledWith(syncMessage.list);
    expect((component as any).addNewFeature).toHaveBeenCalledWith(newFeatureMessage.item);
  });

  it('should sync feature list', () => {
    spyOn(component as any, 'selectAction').and.callThrough();

    const list: Feature[] = [{
      componentId: '1',
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    }, {
      componentId: '2',
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    }];

    (component as any).syncFeatureList(list);
    const action1 = getFeatureById(list[0].componentId)
    const action2 = getFeatureById(list[1].componentId)

    expect((component as any).selectAction).toHaveBeenCalledWith(action1, false, {
      instanceId: list[0].instanceId,
      configs: list[0].configs,
      lock: list[0].lock,
      data: list[0].data
    })
    expect((component as any).selectAction).toHaveBeenCalledWith(action2, false, {
      instanceId: list[1].instanceId,
      configs: list[1].configs,
      lock: list[1].lock,
      data: list[1].data
    })

  });

  it('should add a new feature', () => {
    spyOn(component as any, 'selectAction').and.callThrough();

    const item: Feature = {
      componentId: '1',
      instanceId: 'testInstanceId',
      configs: {x: 0, y: 0},
      lock: false,
      data: {}
    };

    (component as any).addNewFeature(item);
    const action = getFeatureById(item.componentId)

    expect((component as any).selectAction).toHaveBeenCalledWith(action, false, {
      instanceId: item.instanceId,
      configs: item.configs,
      lock: item.lock,
      data: item.data
    })
  });

  it('should send a new feature message', () => {
    const feature = {
      componentId: '1',
      instanceId: 'testInstanceId',
      configs: {},
      lock: false,
      data: {}
    } as Feature;

    (component as any).sendNewFeature(feature);
    expect(messageServiceSpy.sendMessage).toHaveBeenCalledWith(new NewFeatureMessage(feature));
  });
});
