import {TextInputComponent} from "../shared/components/inputs/text-input/text-input.component";
import {TextAreaInputComponent} from "../shared/components/inputs/text-area-input/text-area-input.component";
import {BasicButtonComponent} from "../shared/components/buttons/basic-button/basic-button.component";
import {RaisedButtonComponent} from "../shared/components/buttons/raised-button/raised-button.component";
import {StrokedButtonComponent} from "../shared/components/buttons/stroked-button/stroked-button.component";
import {Type} from "@angular/core";
import {CalenderComponent} from "../shared/components/calender/calender/calender.component";
import {H1HeadlineComponent} from "../shared/components/headlines/h1-headline/h1-headline.component";
import {H2HeadlineComponent} from "../shared/components/headlines/h2-headline/h2-headline.component";
import {H3HeadlineComponent} from "../shared/components/headlines/h3-headline/h3-headline.component";
import {H4HeadlineComponent} from "../shared/components/headlines/h4-headline/h4-headline.component";
import {ParagraphComponent} from "../shared/components/headlines/paragraph/paragraph.component";
import {ImageComponent} from "../shared/components/image/image/image.component";


export interface FeatureGroup {
  title: string;
  icon: string;
  children: Array<FeatureAction>
}

export interface FeatureAction {
  title: string;
  icon: string;
  component: Type<any>;
}

export const Features: Array<FeatureGroup> = [
  {
    title: 'cursor',
    icon: 'fa fa-arrow-pointer',
    children: []
  },
  {
    title: 'Inputs',
    icon: 'fa-sharp fa-regular fa-pen-field',
    children: [
      {
        title: 'text',
        icon: 'fa-solid fa-input-text',
        component: TextInputComponent
      },
      {
        title: 'text-area',
        icon: 'fa-sharp fa-regular fa-input-text',
        component: TextAreaInputComponent
      }
    ]
  },
  {
    title: 'Buttons',
    icon: 'fa-solid fa-square-xmark',
    children: [
      {
        title: 'Basic',
        icon: 'fa-light fa-xmark',
        component: BasicButtonComponent
      },
      {
        title: 'raised',
        icon: 'fa-solid fa-square-xmark',
        component: RaisedButtonComponent
      },
      {
        title: 'stroked',
        icon: 'fa-regular fa-square-xmark',
        component: StrokedButtonComponent
      }
    ]
  },
  {
    title: 'calender',
    icon: 'fa-solid fa-calendar-days',
    children: [{
      title: 'calender',
      icon: 'fa-solid fa-calendar-days',
      component: CalenderComponent
    }]
  },
  {
    title: 'Heading',
    icon: 'fa-solid fa-heading',
    children: [
      {
        title: 'H1',
        icon: 'fa-solid fa-heading',
        component: H1HeadlineComponent
      },
      {
        title: 'H2',
        icon: 'fa-solid fa-heading',
        component: H2HeadlineComponent
      },
      {
        title: 'H3',
        icon: 'fa-solid fa-heading',
        component: H3HeadlineComponent
      },
      {
        title: 'H4',
        icon: 'fa-solid fa-heading',
        component: H4HeadlineComponent
      },
      {
        title: 'P',
        icon: 'fa-solid fa-paragraph',
        component: ParagraphComponent
      },
    ]
  },
  {
    title: 'Image',
    icon: 'fa-solid fa-image',
    children: [
      {
        title: 'Image',
        icon: 'fa-solid fa-image',
        component: ImageComponent
      },
    ]
  }
]
