import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss']
})
export class StrokedButtonComponent  extends FeatureGeneric{
  constructor(public override renderer: Renderer2, public override messageService: MessageService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, cdr, dialog);
  }
}