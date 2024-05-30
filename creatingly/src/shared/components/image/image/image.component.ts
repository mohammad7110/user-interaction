import {Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends FeatureGeneric {
  src ='';
  constructor(public override renderer: Renderer2) {
    super(renderer);
  }

}
