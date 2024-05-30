import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalenderComponent} from './calender/calender.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";


@NgModule({
  declarations: [
    CalenderComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    CalenderComponent
  ]
})
export class CalenderModule {
}
