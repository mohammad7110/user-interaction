import {Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends FeatureGeneric {
  minWidth = 80;
  minHeight = 40;

  dataConfigs: Array<{ label: string, control: FormControl<any> }> = [
    {
      label: 'label',
      control: this.formGroup.get('label') as FormControl
    },
    {
      label: 'font-size',
      control: this.formGroup.get('fontSize') as FormControl
    },
    {
      label: 'bold',
      control: this.formGroup.get('bold') as FormControl
    },
    {
      label: 'color',
      control: this.formGroup.get('color') as FormControl
    }
  ]
  constructor(public override renderer: Renderer2, public override messageService: MessageService,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, dialog);
  }
}
