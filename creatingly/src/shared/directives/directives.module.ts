import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicHostDirective} from './dynamic-host/dynamic-host.directive';
import { ResizableDirective } from './resizable/resizable.directive';


@NgModule({
  declarations: [
    DynamicHostDirective,
    ResizableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicHostDirective,
    ResizableDirective
  ]
})
export class DirectivesModule {
}
