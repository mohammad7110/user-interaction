import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-h3-headline',
  templateUrl: './h3-headline.component.html',
  styleUrls: ['./h3-headline.component.scss']
})
export class H3HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }

}
