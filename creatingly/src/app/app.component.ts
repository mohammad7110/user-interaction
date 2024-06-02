import { Component, ViewChild} from '@angular/core';
import {Feature, FeatureConfig, FeatureList, getFeatureById} from "../models/features";
import {DynamicHostDirective} from "../shared/directives/dynamic-host/dynamic-host.directive";
import {NewFeatureMessage} from "../models/messages/new-feature-message";
import {RemoveFeatureMessage} from "../models/messages/remove-feature-message";
import {MessageService} from "../services/message/message.service";
import {Message} from "../models/messages/message";
import {ListSyncMessage} from "../models/messages/list-sync-message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicHostDirective, {static: true}) dynamicHost!: DynamicHostDirective;
  public list: Array<Feature> = []

  constructor( private messageService: MessageService) {
    this.messageService.notification.subscribe(this.receivedNotification.bind(this));
  }

  selectAction(action: FeatureList, isNewFeature: boolean, id?: string, configs?: FeatureConfig, lock?: boolean, data?: any) {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(action.component);
    if (id) {
      componentRef.instance.id = id;
    }
    if (lock !== undefined) {
      componentRef.instance.lock = lock;
    }
    if (configs) {
      componentRef.instance.configs = configs;
    }
    if (data) {
      componentRef.instance.formGroup.patchValue(data, {emitEvent: false});
    }
    componentRef.instance.configChange.subscribe((featureConfig: { config: FeatureConfig, id: string }) => {
      const item = this.list.find(i => i.instanceId === featureConfig.id);
      if (item) {
        item.configs = featureConfig.config;
      }
    });
    componentRef.instance.dataChange.subscribe((data: any) => {
      const item = this.list.find(i => i.instanceId === componentRef.instance.id);
      if (item) {
        item.data = data;
      }
    })
    componentRef.instance.remove.subscribe(() => {
      const itemIndex = this.list.findIndex(i => i.instanceId === componentRef.instance.id);
      if (itemIndex >= 0) {
        this.list.splice(itemIndex, 1);
        const message = new RemoveFeatureMessage(componentRef.instance.id);
        this.messageService.sendMessage(message);
        viewContainerRef.remove(itemIndex)
      }
    });
    const feature = {
      componentId: action.componentId,
      instanceId: componentRef.instance.id,
      configs: componentRef.instance.configs,
      lock: componentRef.instance.lock,
      data: componentRef.instance.formGroup.value
    }
    this.list.push(feature)
    if (isNewFeature) {
      this.sendNewFeature(feature)
    }
  }


  private receivedNotification(message: Message): void {
    if (message instanceof ListSyncMessage) {
      message.list.forEach(item => {
        const action = getFeatureById(item.componentId);
        if (action) {
          this.selectAction(action, false, item.instanceId, item.configs, item.lock, item.data)
        }
      })
    } else if (message instanceof NewFeatureMessage) {
      const action = getFeatureById(message.item.componentId);
      if (action) {
        this.selectAction(action, false, message.item.instanceId, message.item.configs, message.item.lock, message.item.data)
      }
    } else if (message instanceof RemoveFeatureMessage) {
      const itemIndex = this.list.findIndex(i => i.instanceId === message.instanceId);
      if (itemIndex >= 0) {
        this.list.splice(itemIndex, 1);
        this.dynamicHost.viewContainerRef.remove(itemIndex);
      }
    }
  }


  private sendNewFeature(feature: Feature) {
    const message = new NewFeatureMessage(feature)
    this.messageService.sendMessage(message)

  }

}
