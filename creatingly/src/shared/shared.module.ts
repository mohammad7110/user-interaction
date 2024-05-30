import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {DirectivesModule} from "./directives/directives.module";
import {ComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [
    MaterialModule,
    DirectivesModule,
    ComponentsModule,
  ]
})
export class SharedModule {
}
