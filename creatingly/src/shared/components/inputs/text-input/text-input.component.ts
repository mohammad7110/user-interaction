import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";
import {CommunicationService} from "../../../../services/communication/communication.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2, public override communicationService: CommunicationService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, communicationService, cdr ,dialog);
  }


}
