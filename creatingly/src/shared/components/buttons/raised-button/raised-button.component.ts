import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";
import {CommunicationService} from "../../../../services/communication/communication.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss']
})
export class RaisedButtonComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2, public override communicationService: CommunicationService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, communicationService, cdr ,dialog);
  }
}
