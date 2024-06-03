import {Component, ComponentRef, ViewChild} from '@angular/core';
import {Feature, FeatureConfig, FeatureList, getFeatureById} from '../models/features';
import {DynamicHostDirective} from '../shared/directives/dynamic-host/dynamic-host.directive';
import {NewFeatureMessage} from '../models/messages/new-feature-message';
import {MessageService} from '../services/message/message.service';
import {Message} from '../models/messages/message';
import {ListSyncMessage} from '../models/messages/list-sync-message';

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

  /**
   * Handles the selection of an action, initializing a new component based on the action provided.
   * @param action The action that triggers the component creation.
   * @param isNewFeature Indicates if the action corresponds to a new feature.
   * @param options its contains instanceId(id property new component ) , configs( detail about position like width , height , top ,left) ,
   * lock( status of lock property in component when a component lock=true other users couldn't edit it ) data(value of other data of component
   * for example placeholder ,font-size , color, background-color,...),
   */
  selectAction(
    action: FeatureList,
    isNewFeature: boolean,
    options?: {
      instanceId?: string,
      configs?: FeatureConfig,
      lock?: boolean,
      data?: any
    }
  ): void {
    const componentRef = this.createComponent(action);

    this.initializeComponent(componentRef, options);
    this.setupComponentRemoval(componentRef);
    this.handleNewFeature(componentRef, action, isNewFeature);
  }

  /**
   * Creates a new component based on the action provided.
   * @param action The action that determines the component type.
   * @returns A reference to the newly created component.
   */
  private createComponent(action: FeatureList): ComponentRef<any> {
    return this.dynamicHost.viewContainerRef.createComponent(action.component);
  }

  /**
   * Initializes the component with the provided parameters.
   * @param componentRef Reference to the component to be initialized.
   * @param options
   */
  private initializeComponent(
    componentRef: ComponentRef<any>,
    options?: {
      instanceId?: string,
      configs?: FeatureConfig,
      lock?: boolean,
      data?: any
    }
  ): void {
    if (options) {

      if (options.instanceId) {
        componentRef.instance.id = options.instanceId
      }
      if (options.configs) {
        componentRef.instance.configs = options.configs;
      }
      if (options.lock !== undefined) {
        componentRef.instance.lock = options.lock;
      }
      if (options.data) {
        componentRef.instance.formGroup.patchValue(options.data, {emitEvent: false});
      }
    }
  }

  /**
   * Sets up the removal mechanism for the component when the 'remove' event is triggered.
   * @param componentRef Reference to the component to be removed.
   */
  private setupComponentRemoval(componentRef: ComponentRef<any>): void {
    componentRef.instance.remove.subscribe(() => {
      componentRef.destroy();
    });
  }

  /**
   * Handles the process when a new feature is selected.
   * @param componentRef Reference to the newly created component.
   * @param action The action that triggered the component creation.
   * @param isNewFeature Indicates if the action corresponds to a new feature.
   */
  private handleNewFeature(
    componentRef: ComponentRef<any>,
    action: FeatureList,
    isNewFeature: boolean
  ): void {
    const feature = this.createFeature(componentRef, action);
    if (isNewFeature) {
      this.sendNewFeature(feature);
    }
  }

  /**
   * Creates a feature object based on the component reference and action.
   * @param componentRef Reference to the component.
   * @param action The action that triggered the component creation.
   * @returns The created feature object.
   */
  private createFeature(
    componentRef: ComponentRef<any>,
    action: FeatureList
  ): Feature {
    return {
      componentId: action.componentId,
      instanceId: componentRef.instance.id,
      configs: componentRef.instance.configs,
      lock: componentRef.instance.lock,
      data: componentRef.instance.formGroup.value
    };
  }

  /**
   * Handles incoming notifications and processes them accordingly.
   * @param message The received message.
   */
  private receivedNotification(message: Message): void {
    if (message instanceof ListSyncMessage) {
      this.syncFeatureList(message.list);
    } else if (message instanceof NewFeatureMessage) {
      this.addNewFeature(message.item);
    }
  }

  /**
   * Synchronizes the feature list based on the provided list data.
   * @param list The list of features to be synchronized it's about detail of components for example instanceId , configs ,  data and lock and
   * also about componentId in Features.
   */
  private syncFeatureList(list: Feature[]): void {
    this.dynamicHost.viewContainerRef.clear();
    list.forEach(item => {
      const action = getFeatureById(item.componentId);
      if (action) {
        this.selectAction(action, false, {
          instanceId: item.instanceId,
          configs: item.configs,
          lock: item.lock,
          data: item.data
        });
      }
    });
  }

  /**
   * Adds a new feature based on the provided item data.
   * @param item The item data for the new feature . it's about detail of components for example instanceId , configs ,  data and lock and
   * also about componentId in Features.
   */
  private addNewFeature(item: Feature): void {
    const action = getFeatureById(item.componentId);
    if (action) {
      this.selectAction(action, false,
        {
          instanceId: item.instanceId,
          configs: item.configs,
          lock: item.lock,
          data: item.data
        });
    }
  }

  /**
   * Sends a new feature message through the message service.
   * @param feature The feature to be sent.
   */
  private sendNewFeature(feature: Feature): void {
    const message = new NewFeatureMessage(feature);
    this.messageService.sendMessage(message);
  }
}
