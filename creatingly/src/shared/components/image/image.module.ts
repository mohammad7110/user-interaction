import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CommonModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports:[
    ImageComponent
  ]
})
export class ImageModule { }
