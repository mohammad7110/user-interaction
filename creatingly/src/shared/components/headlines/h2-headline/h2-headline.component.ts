import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-h2-headline',
  templateUrl: './h2-headline.component.html',
  styleUrls: ['./h2-headline.component.scss']
})
export class H2HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }

}
