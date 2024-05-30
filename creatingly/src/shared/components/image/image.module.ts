import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";



@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports:[
    ImageComponent
  ]
})
export class ImageModule { }
