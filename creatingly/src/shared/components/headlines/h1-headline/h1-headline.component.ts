import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-h1-headline',
  templateUrl: './h1-headline.component.html',
  styleUrls: ['./h1-headline.component.scss']
})
export class H1HeadlineComponent extends FeatureGeneric {
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }

}
