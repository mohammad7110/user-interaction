import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {FormControl} from "@angular/forms";
import {MessageService} from "../../../services/message/message.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends FeatureGeneric {
  minWidth = 100;
  minHeight = 100;

  dataConfigs: Array<{ label: string, control: FormControl<any> }> = [

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

