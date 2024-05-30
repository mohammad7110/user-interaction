import {ChangeDetectorRef, Component, Type, ViewChild} from '@angular/core';
import {Feature, FeatureAction, FeatureConfig, getFeatureById} from "../models/features";
import {DynamicHostDirective} from "../shared/directives/dynamic-host/dynamic-host.directive";
import {CommunicationService} from "../services/communication/communication.service";
import {ListRequestMessage} from "../models/messages/list-request-message";
import {ListSyncMessage} from "../models/messages/list-sync-message";
import {Packet} from "../models/packet";
import {ConfigFeatureMessage} from "../models/messages/config-feature-message";
import {NewFeatureMessage} from "../models/messages/new-feature-message";
import {Utility} from "../models/utility";
import {RemoveFeatureMessage} from "../models/messages/remove-feature-message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicHostDirective, {static: true}) dynamicHost!: DynamicHostDirective;
  public list: Array<Feature> = []

  constructor(private communicationService: CommunicationService, private cdr: ChangeDetectorRef) {
    this.communicationService.leadership.subscribe(() => {
      document.title = 'leader'
    });

    if (!this.communicationService.isLeader)
      this.activeFollowerTasks();
    this.communicationService.notification.subscribe(this.receivedNotification.bind(this));
  }

  selectAction(action: FeatureAction, isNewFeature: boolean, id?: string, configs?: FeatureConfig, lock?: boolean, data?: any) {
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
        this.communicationService.sendMessage(message);
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

  private activeFollowerTasks(): void {
    const message = new ListRequestMessage();
    this.communicationService.sendRequest(message)
      .then((res) => {
        if (res instanceof ListSyncMessage) {
          res.list.forEach(item => {
            const action = getFeatureById(item.componentId);
            if (action) {
              this.selectAction(action, false, item.instanceId, item.configs, item.lock , item.data)
            }
          })
          this.cdr.detectChanges();
        }

      })
      .catch(() => {
      });

  }

  private receivedNotification(packet: Packet): void {
    const message = packet.message;
    if (message instanceof ListRequestMessage) {
      const listSyncMessage = new ListSyncMessage(this.list);
      this.communicationService.responseRequest(packet, listSyncMessage);
      return;
    } else if (message instanceof NewFeatureMessage) {
      const action = getFeatureById(message.item.componentId);
      if (action) {
        this.selectAction(action, false, message.item.instanceId, message.item.configs, message.item.lock , message.item.data)
      }
      this.cdr.detectChanges();
    } else if (message instanceof RemoveFeatureMessage) {
      const itemIndex = this.list.findIndex(i => i.instanceId === message.instanceId);
      if (itemIndex >= 0) {
        this.list.splice(itemIndex, 1);
        this.dynamicHost.viewContainerRef.remove(itemIndex);
        this.cdr.detectChanges();
      }
    }
  }


  private sendNewFeature(feature: Feature) {
    const message = new NewFeatureMessage(feature)
    this.communicationService.sendMessage(message)

  }
}
