import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";
import {CommunicationService} from "../../../../services/communication/communication.service";

@Component({
  selector: 'app-h4-headline',
  templateUrl: './h4-headline.component.html',
  styleUrls: ['./h4-headline.component.scss']
})
export class H4HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2, public override communicationService: CommunicationService, public override cdr: ChangeDetectorRef) {
    super(renderer, communicationService, cdr);
  }
}