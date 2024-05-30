import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputsModule} from "./inputs/inputs.module";
import {ButtonsModule} from "./buttons/buttons.module";
import {CalenderModule} from "./calender/calender.module";
import {HeadlinesModule} from "./headlines/headlines.module";
import {ImageModule} from "./image/image.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule],
  exports: [
    InputsModule,
    ButtonsModule,
    CalenderModule,
    HeadlinesModule,
    ImageModule
  ]
})
export class ComponentsModule {
}
