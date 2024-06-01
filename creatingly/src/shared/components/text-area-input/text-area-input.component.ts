import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss']
})
export class TextAreaInputComponent  extends FeatureGeneric{
  constructor(public override renderer: Renderer2, public override messageService: MessageService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, cdr, dialog);
  }


}
