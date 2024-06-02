import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends FeatureGeneric {
  minWidth = 70;
  minHeight = 30;


  dataConfigs: Array<{ label: string, control: FormControl<any> }> = [
    {
      label: 'text',
      control: this.formGroup.get('text') as FormControl
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
    },
    {
      label: 'backgroundColor',
      control: this.formGroup.get('backgroundColor') as FormControl
    },
    // {
    //   label: 'border-width',
    //   control: this.formGroup.get('borderWidth') as FormControl
    // },
    // {
    //   label: 'border-color',
    //   control: this.formGroup.get('borderColor') as FormControl
    // }
  ]

  constructor(public override renderer: Renderer2, public override messageService: MessageService,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, dialog);
  }
}
