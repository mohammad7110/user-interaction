import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureGeneric} from "./feature-generic/feature-generic.component";
import {ChangeTextDialogComponent} from './change-text-dialog/change-text-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {DirectivesModule} from "../directives/directives.module";
import {TextInputComponent} from "./text-input/text-input.component";
import {TextAreaInputComponent} from "./text-area-input/text-area-input.component";
import {LabelComponent} from "./label/label.component";
import {CalenderComponent} from "./calender/calender.component";
import {ImageComponent} from "./image/image.component";
import {ButtonComponent} from './button/button.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    FeatureGeneric,
    ChangeTextDialogComponent,
    TextInputComponent,
    TextAreaInputComponent,
    LabelComponent,
    CalenderComponent,
    ImageComponent,
    ButtonComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    TextInputComponent,
    TextAreaInputComponent,
    LabelComponent,
    CalenderComponent,
    ImageComponent,
    FeatureGeneric,
    ButtonComponent,
    CardComponent
  ]
})
export class ComponentsModule {
}
