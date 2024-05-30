import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from './text-input/text-input.component';
import {TextAreaInputComponent} from './text-area-input/text-area-input.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";


@NgModule({
  declarations: [
    TextInputComponent,
    TextAreaInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    TextInputComponent,
    TextAreaInputComponent
  ]
})
export class InputsModule {
}
