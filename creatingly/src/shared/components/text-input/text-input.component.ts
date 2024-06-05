import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends FeatureGeneric {
  minWidth = 140;
  minHeight = 35;

  dataConfigs: Array<{ label: string, control: FormControl<any> }> = [
    {
      label: 'placeHolder',
      control: this.formGroup.get('placeHolder') as FormControl
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
    {
      label:'radius',
      control: this.formGroup.get('borderRadius') as FormControl
    }
  ]

  constructor(public override renderer: Renderer2, public override messageService: MessageService,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, dialog);
  }

}
