import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";
import {CommunicationService} from "../../../../services/communication/communication.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-h1-headline',
  templateUrl: './h1-headline.component.html',
  styleUrls: ['./h1-headline.component.scss']
})
export class H1HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2, public override communicationService: CommunicationService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, communicationService, cdr ,dialog);
  }
}
