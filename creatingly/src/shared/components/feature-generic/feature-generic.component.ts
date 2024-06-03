import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {Component, ElementRef, EventEmitter, Output, Renderer2} from "@angular/core";
import {Utility} from "../../../models/utility";
import {FeatureConfig} from "../../../models/features";
import {ConfigFeatureMessage} from "../../../models/messages/config-feature-message";
import {LockFeatureMessage} from "../../../models/messages/lock-feature-message";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ChangeTextDialogComponent} from "../change-text-dialog/change-text-dialog.component";
import {debounceTime} from "rxjs";
import {DataFeatureMessage} from "../../../models/messages/data-feature-message";
import {MessageService} from "../../../services/message/message.service";
import {Message} from "../../../models/messages/message";
import {RemoveFeatureMessage} from "../../../models/messages/remove-feature-message";


@Component({
  selector: 'app-feature-generic',
  templateUrl: './feature-generic.component.html',
  styleUrls: ['./feature-generic.component.scss']
})
export class FeatureGeneric {

  @Output() remove = new EventEmitter();

  formGroup = new FormGroup({
    placeHolder: new FormControl('input'),
    value: new FormControl(''),
    src: new FormControl(''),
    fontSize: new FormControl(16),
    text: new FormControl('click'),
    label: new FormControl('label'),
    bold: new FormControl(false),
    color: new FormControl('rgba(0, 0, 0, 0.87)'),
    backgroundColor: new FormControl('rgba(255, 255, 255, 1)'),
  });

  public id = Utility.generateShortUID();
  public lock: boolean = false;
  public configs: FeatureConfig = {
    x: 0,
    y: 0,
  };
  private startX = this.configs.x;
  private startY = this.configs.y;

  constructor(public renderer: Renderer2, public messageService: MessageService, public dialog: MatDialog) {
    this.messageService.notification.subscribe(this.receivedNotification.bind(this));


    // Handle value changes in the form group
    this.formGroup.valueChanges.subscribe((res: any) => {
      this.sendLock(true);
      this.sendDataMessage(res);
    });

    // Debounce to avoid frequent updates
    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.sendLock(false);
    });
  }


  /**
   * Handles incoming messages and updates component state accordingly.
   * @param message The received message.
   */
  private receivedNotification(message: Message): void {
    if (message instanceof ConfigFeatureMessage && message.instanceId === this.id) {
      this.configs = message.config;
    } else if (message instanceof LockFeatureMessage && message.instanceId === this.id) {
      this.handleLockMessage(message);
    } else if (message instanceof DataFeatureMessage && message.instanceId === this.id) {
      this.formGroup.patchValue(message.data, {emitEvent: false});
    } else if (message instanceof RemoveFeatureMessage && message.instanceId === this.id) {
      this.remove.emit();
    }
  }

  /**
   * Handles drag start events.
   */
  dragStart(): void {
    this.sendDataMessage(true);
    this.startX = this.configs.x;
    this.startY = this.configs.y;
  }

  /**
   * Handles drag move events.
   * @param event The drag move event.
   */
  move(event: CdkDragMove<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.startX = this.configs.x + sourcePosition.x;
    this.startY = this.configs.y + sourcePosition.y;
    this.sendConfigMessage({
      width: this.configs.width,
      height: this.configs.height,
      x: this.startX,
      y: this.startY
    });

  }


  /**
   * Handles drag end events.
   * @param event The drag end event.
   */
  drop(event: CdkDragEnd<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.configs.x += sourcePosition.x;
    this.configs.y += sourcePosition.y;
    this.renderer.setStyle(event.source.element.nativeElement, 'transform', null);
    event.source.reset();
    this.sendConfigMessage(this.configs);
    this.sendLock(false);

  }


  /**
   * Handles resize start events.
   */
  onResizeStart() {
    this.sendLock(true);

  }


  /**
   * Handles resize move events.
   * @param event The resize move event.
   */
  onResizeMove(event: { width: number; height: number; left: number; top: number }) {
    this.configs.width = event.width;
    this.configs.height = event.height;
    this.configs.x = event.left;
    this.configs.y = event.top;
    this.sendConfigMessage(this.configs);
  }


  /**
   * Handles resize end events.
   */
  onResizeEnd() {
    this.sendLock(false);
  }


  /**
   * Sends a remove feature message and emits the remove event.
   */
  removeFeature(): void {
    const message = new RemoveFeatureMessage(this.id);
    this.messageService.sendMessage(message);
    this.remove.emit();
  }


  /**
   * Opens a dialog to change data config if the component is not locked.
   * @param forms Array of form controls for the dialog.
   */
  changeDataConfig(forms: Array<{ label: string, control: FormControl }>) {
    if (!this.lock) {
      this.dialog.open(ChangeTextDialogComponent, {
        data: forms
      }).afterClosed().subscribe(() => {

      })
    }
  }


  /**
   * Sends a lock message to lock or unlock the component.
   * @param lock Indicates whether to lock or unlock the component.
   */
  private sendLock(lock: boolean): void {
    const lockMessage = new LockFeatureMessage(this.id, lock);
    this.messageService.sendMessage(lockMessage);
  }


  /**
   * Sends a data message.
   * @param data The data to be sent.
   */
  private sendDataMessage(data: any): void {
    const dataMessage = new DataFeatureMessage(this.id, data);
    this.messageService.sendMessage(dataMessage);
  }


  /**
   * Handles lock messages.
   * @param message The lock message.
   */
  private handleLockMessage(message: LockFeatureMessage): void {
    this.lock = message.lock;
    if (this.lock) {
      this.formGroup.disable({emitEvent: false});
    } else {
      this.formGroup.enable({emitEvent: false});
    }
  }

  /**
   * Sends a configuration message.
   */
  private sendConfigMessage(config: FeatureConfig): void {
    const message = new ConfigFeatureMessage(this.id, config);
    this.messageService.sendMessage(message);
  }


}
