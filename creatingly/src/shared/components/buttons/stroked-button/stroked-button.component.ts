import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss']
})
export class StrokedButtonComponent  extends FeatureGeneric{
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }
}
