import {CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Renderer2} from "@angular/core";
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


@Component({
  selector: 'app-feature-generic',
  templateUrl: './feature-generic.component.html',
  styleUrls: ['./feature-generic.component.scss']
})
export class FeatureGeneric {
  @Output() configChange = new EventEmitter<{ config: FeatureConfig, id: string }>();
  @Output() dataChange = new EventEmitter<any>();

  @Output() remove = new EventEmitter();


  formGroup = new FormGroup({
    placeHolder: new FormControl('input'),
    value: new FormControl(''),
    src: new FormControl(''),
    fontSize: new FormControl(16),
    text: new FormControl('click'),
    label: new FormControl('label'),
    bold: new FormControl(false),
    color: new FormControl('rgba(0, 0, 0, 0.87)')

  })

  public id = Utility.generateShortUID();
  public lock: boolean = false;
  public configs: FeatureConfig = {
    x: 0,
    y: 0,
  }

  private startX = this.configs.x;
  private startY = this.configs.y;

  constructor(public renderer: Renderer2, public messageService: MessageService, public cdr: ChangeDetectorRef, public dialog: MatDialog) {
    this.messageService.notification.subscribe(this.receivedNotification.bind(this));
    this.formGroup.valueChanges.subscribe((res: any) => {
      const lockMessage = new LockFeatureMessage(this.id, true);
      this.messageService.sendMessage(lockMessage);

      const dataMessage = new DataFeatureMessage(this.id, res);
      this.messageService.sendMessage(dataMessage)
      this.dataChange.next(this.formGroup.value);
    })
    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(res => {
      const message = new LockFeatureMessage(this.id, false);
      this.messageService.sendMessage(message)
    })
  }

  private receivedNotification(message: Message): void {
    if (message instanceof ConfigFeatureMessage && message.instanceId === this.id) {
      this.configs = message.config;
      this.configChange.next({config: this.configs, id: this.id});
      this.cdr.detectChanges();
    } else if (message instanceof LockFeatureMessage && message.instanceId === this.id) {
      this.lock = message.lock;
      if (this.lock) {
        this.formGroup.disable({emitEvent: false})
      } else {
        this.formGroup.enable({emitEvent: false});
      }
      this.cdr.detectChanges();
    } else if (message instanceof DataFeatureMessage && message.instanceId === this.id) {
      this.formGroup.patchValue(message.data, {emitEvent: false});
      this.dataChange.next(this.formGroup.value);

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
    this.messageService.sendMessage(message)

  }

  drop(event: CdkDragEnd<ElementRef>) {
    const sourcePosition = event.source.getFreeDragPosition();
    this.configs.x += sourcePosition.x;
    this.configs.y += sourcePosition.y;
    this.renderer.setStyle(event.source.element.nativeElement, 'transform', null);
    event.source.reset();
    const message = new ConfigFeatureMessage(this.id, this.configs);
    this.messageService.sendMessage(message)
    this.configChange.next({config: this.configs, id: this.id});
    const lockMessage = new LockFeatureMessage(this.id, false);
    this.messageService.sendMessage(lockMessage)
  }


  onResizeMove(event: { width: number; height: number; left: number; top: number }) {
    this.configs.width = event.width;
    this.configs.height = event.height;
    this.configs.x = event.left;
    this.configs.y = event.top;
    const message = new ConfigFeatureMessage(this.id, this.configs);
    this.messageService.sendMessage(message)
    this.configChange.next({config: this.configs, id: this.id});
  }

  onResizeEnd() {
    const message = new LockFeatureMessage(this.id, false);
    this.messageService.sendMessage(message)
  }

  onResizeStart() {
    const message = new LockFeatureMessage(this.id, true);
    this.messageService.sendMessage(message)
  }

  dragStart(): void {
    const message = new LockFeatureMessage(this.id, true);
    this.messageService.sendMessage(message)
    this.startX = this.configs.x;
    this.startY = this.configs.y;
  }

  removeFeature(): void {
    this.remove.emit();
  }

  changeText(label: string) {
    if (!this.lock) {
      const control = this.formGroup.get(label);
      const fontSizeControl = this.formGroup.get('fontSize');
      const fontWeightControl = this.formGroup.get('bold');
      const colorControl = this.formGroup.get('color')

      if (control) {

        this.dialog.open(ChangeTextDialogComponent, {
          data: {
            control: control,
            fontSizeControl,
            fontWeightControl,
            colorControl,
            label
          }
        }).afterClosed().subscribe(() => {

        })
      }
    }
  }


}
