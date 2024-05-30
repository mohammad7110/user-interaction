import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {H1HeadlineComponent} from './h1-headline/h1-headline.component';
import {H2HeadlineComponent} from './h2-headline/h2-headline.component';
import {H3HeadlineComponent} from './h3-headline/h3-headline.component';
import {H4HeadlineComponent} from './h4-headline/h4-headline.component';
import {ParagraphComponent} from './paragraph/paragraph.component';
import {MaterialModule} from "../../material/material.module";
import {DirectivesModule} from "../../directives/directives.module";


@NgModule({
  declarations: [
    H1HeadlineComponent,
    H2HeadlineComponent,
    H3HeadlineComponent,
    H4HeadlineComponent,
    ParagraphComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports: [
    H1HeadlineComponent,
    H2HeadlineComponent,
    H3HeadlineComponent,
    H4HeadlineComponent,
    ParagraphComponent
  ]
})
export class HeadlinesModule {
}
