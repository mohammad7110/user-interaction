import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureGeneric} from "./feature-generic/feature-generic.component";
import {ChangeTextDialogComponent} from './change-text-dialog/change-text-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {DirectivesModule} from "../directives/directives.module";
import {RaisedButtonComponent} from "./raised-button/raised-button.component";
import {StrokedButtonComponent} from "./stroked-button/stroked-button.component";
import {BasicButtonComponent} from "./basic-button/basic-button.component";
import {TextInputComponent} from "./text-input/text-input.component";
import {TextAreaInputComponent} from "./text-area-input/text-area-input.component";
import {LabelComponent} from "./label/label.component";
import {CalenderComponent} from "./calender/calender.component";
import {ImageComponent} from "./image/image.component";


@NgModule({
  declarations: [
    FeatureGeneric,
    ChangeTextDialogComponent,
    BasicButtonComponent,
    StrokedButtonComponent,
    RaisedButtonComponent,
    TextInputComponent,
    TextAreaInputComponent,
    LabelComponent,
    CalenderComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    BasicButtonComponent,
    StrokedButtonComponent,
    RaisedButtonComponent,
    TextInputComponent,
    TextAreaInputComponent,
    LabelComponent,
    CalenderComponent,
    ImageComponent,
    FeatureGeneric

  ]
})
export class ComponentsModule {
}
