import {Component, ViewChild} from '@angular/core';
import {Feature, FeatureConfig, FeatureList, getFeatureById} from "../models/features";
import {DynamicHostDirective} from "../shared/directives/dynamic-host/dynamic-host.directive";
import {NewFeatureMessage} from "../models/messages/new-feature-message";
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

  constructor(private messageService: MessageService) {
    this.messageService.notification.subscribe(this.receivedNotification.bind(this));
  }

  selectAction(action: FeatureList, isNewFeature: boolean, id?: string, configs?: FeatureConfig, lock?: boolean, data?: any) {
    const componentRef = this.dynamicHost.viewContainerRef.createComponent(action.component);
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

    componentRef.instance.remove.subscribe(() => {
      componentRef.destroy();
    });
    const feature = {
      componentId: action.componentId,
      instanceId: componentRef.instance.id,
      configs: componentRef.instance.configs,
      lock: componentRef.instance.lock,
      data: componentRef.instance.formGroup.value
    }
    if (isNewFeature) {
      this.sendNewFeature(feature)
    }
  }


  private receivedNotification(message: Message): void {
    if (message instanceof ListSyncMessage) {
      this.dynamicHost.viewContainerRef.clear();
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
    }
  }


  private sendNewFeature(feature: Feature) {
    const message = new NewFeatureMessage(feature)
    this.messageService.sendMessage(message)
  }

}
