import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputsModule} from "./inputs/inputs.module";
import {ButtonsModule} from "./buttons/buttons.module";
import {CalenderModule} from "./calender/calender.module";
import {HeadlinesModule} from "./headlines/headlines.module";
import {ImageModule} from "./image/image.module";
import {FeatureGeneric} from "./feature-generic/feature-generic.component";


@NgModule({
  declarations: [FeatureGeneric],
  imports: [
    CommonModule],
  exports: [
    InputsModule,
    ButtonsModule,
    CalenderModule,
    HeadlinesModule,
    ImageModule, FeatureGeneric

  ]
})
export class ComponentsModule {
}
