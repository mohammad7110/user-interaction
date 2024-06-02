import {Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent extends FeatureGeneric {
  minWidth = 180;
  minHeight = 250;

  constructor(public override renderer: Renderer2, public override messageService: MessageService,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, dialog);
  }

}
