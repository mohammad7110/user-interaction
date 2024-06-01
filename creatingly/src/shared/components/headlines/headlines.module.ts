import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LabelComponent} from './label/label.component';


@NgModule({
  declarations: [
    LabelComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CommonModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports: [
    LabelComponent
  ]
})
export class HeadlinesModule {
}
