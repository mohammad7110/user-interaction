import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-h4-headline',
  templateUrl: './h4-headline.component.html',
  styleUrls: ['./h4-headline.component.scss']
})
export class H4HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }

}
