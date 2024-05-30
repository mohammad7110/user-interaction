import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicButtonComponent} from './basic-button/basic-button.component';
import {StrokedButtonComponent} from './stroked-button/stroked-button.component';
import {RaisedButtonComponent} from './raised-button/raised-button.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BasicButtonComponent,
    StrokedButtonComponent,
    RaisedButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports: [
    BasicButtonComponent,
    StrokedButtonComponent,
    RaisedButtonComponent
  ]
})
export class ButtonsModule {
}
