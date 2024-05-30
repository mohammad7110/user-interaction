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
import {Utility} from "./utility";

export interface FeatureConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface Feature {
  instanceId: string;
  configs: FeatureConfig;
  lock: boolean;
  componentId: string;

}

export interface FeatureGroup {
  title: string;
  icon: string;
  children: Array<FeatureAction>
}

export interface FeatureAction {
  title: string;
  icon: string;
  component: Type<any>;

  componentId: string;
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
        component: TextInputComponent,
        componentId: '1'
      },
      {
        title: 'text-area',
        icon: 'fa-sharp fa-regular fa-input-text',
        component: TextAreaInputComponent,
        componentId: '2'
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
        component: BasicButtonComponent,
        componentId: '3'

      },
      {
        title: 'raised',
        icon: 'fa-solid fa-square-xmark',
        component: RaisedButtonComponent,
        componentId: '4'

      },
      {
        title: 'stroked',
        icon: 'fa-regular fa-square-xmark',
        component: StrokedButtonComponent,
        componentId: '5'

      }
    ]
  },
  {
    title: 'calender',
    icon: 'fa-solid fa-calendar-days',
    children: [{
      title: 'calender',
      icon: 'fa-solid fa-calendar-days',
      componentId: '6',
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
        component: H1HeadlineComponent,
        componentId: '7'
      },
      {
        title: 'H2',
        icon: 'fa-solid fa-heading',
        component: H2HeadlineComponent,
        componentId: '8'
      },
      {
        title: 'H3',
        icon: 'fa-solid fa-heading',
        component: H3HeadlineComponent,
        componentId: '9'

      },
      {
        title: 'H4',
        icon: 'fa-solid fa-heading',
        component: H4HeadlineComponent,
        componentId: '10'

      },
      {
        title: 'P',
        icon: 'fa-solid fa-paragraph',
        component: ParagraphComponent,
        componentId: '11'

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
        component: ImageComponent,
        componentId: '12'

      },
    ]
  }
]


export const getFeatureById: (id: string) => undefined | FeatureAction = (id: string) => {
  let featureAction = undefined;
  Features.forEach(group => {
    const item = group.children.find(action => action.componentId === id);
    if (item) {
      featureAction = item;
    }
  });
  return featureAction;

}
