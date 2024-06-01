import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss']
})
export class RaisedButtonComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2, public override messageService: MessageService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, cdr, dialog);
  }
}
