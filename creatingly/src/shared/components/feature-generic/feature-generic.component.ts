import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Renderer2} from "@angular/core";
import {Utility} from "../../../models/utility";
import {FeatureConfig} from "../../../models/features";
import {CommunicationService} from "../../../services/communication/communication.service";
import {Packet} from "../../../models/packet";
import {ConfigFeatureMessage} from "../../../models/messages/config-feature-message";
import {LockFeatureMessage} from "../../../models/messages/lock-feature-message";


@Component({
  selector: 'app-feature-generic',
  templateUrl: './feature-generic.component.html',
  styleUrls: ['./feature-generic.component.scss']
})
export class FeatureGeneric {
  @Output() configChange = new EventEmitter<{ config: FeatureConfig, id: string }>();
  @Output() remove = new EventEmitter();

  public id = Utility.generateShortUID();
  public lock: boolean = false;
  public configs: FeatureConfig = {
    x: 0,
    y: 0,
  }

  private startX = this.configs.x;
  private startY = this.configs.y;

  constructor(public renderer: Renderer2, public communicationService: CommunicationService, public cdr: ChangeDetectorRef) {
    this.communicationService.notification.subscribe(this.receivedNotification.bind(this));

  }

  private receivedNotification(packet: Packet): void {
    const message = packet.message;
    if (message instanceof ConfigFeatureMessage && message.instanceId === this.id) {
      this.configs = message.config;
      this.configChange.next({config: this.configs, id: this.id});
      this.cdr.detectChanges();
    } else if (message instanceof LockFeatureMessage && message.instanceId === this.id) {
      this.lock = message.lock;
      this.cdr.detectChanges();
    }
  }


  move(event: CdkDragMove<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.startX = this.configs.x + sourcePosition.x;
    this.startY = this.configs.y + sourcePosition.y;
    const message = new ConfigFeatureMessage(this.id, {
      width: this.configs.width,
      height: this.configs.height,
      x: this.startX,
      y: this.startY
    });
    this.communicationService.sendMessage(message)

  }

  drop(event: CdkDragEnd<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.configs.x += sourcePosition.x;
    this.configs.y += sourcePosition.y;
    this.renderer.setStyle(event.source.element.nativeElement, 'transform', null);
    event.source.reset();
    const message = new ConfigFeatureMessage(this.id, this.configs);
    this.communicationService.sendMessage(message)
    this.configChange.next({config: this.configs, id: this.id});
    const lockMessage = new LockFeatureMessage(this.id, false);
    this.communicationService.sendMessage(lockMessage)
  }


  onResizeMove(event: { width: number; height: number; left: number; top: number }) {
    this.configs.width = event.width;
    this.configs.height = event.height;
    this.configs.x = event.left;
    this.configs.y = event.top;
    const message = new ConfigFeatureMessage(this.id, this.configs);
    this.communicationService.sendMessage(message)
    this.configChange.next({config: this.configs, id: this.id});
  }

  onResizeEnd() {
    const message = new LockFeatureMessage(this.id, false);
    this.communicationService.sendMessage(message)
  }

  onResizeStart() {
    const message = new LockFeatureMessage(this.id, true);
    this.communicationService.sendMessage(message)
  }

  dragStart(): void {
    const message = new LockFeatureMessage(this.id, true);
    this.communicationService.sendMessage(message)
    this.startX = this.configs.x;
    this.startY = this.configs.y;
  }

  removeFeature(): void {
    this.remove.emit();
  }


}
