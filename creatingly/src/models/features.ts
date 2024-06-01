import {TextInputComponent} from "../shared/components/inputs/text-input/text-input.component";
import {TextAreaInputComponent} from "../shared/components/inputs/text-area-input/text-area-input.component";
import {BasicButtonComponent} from "../shared/components/buttons/basic-button/basic-button.component";
import {RaisedButtonComponent} from "../shared/components/buttons/raised-button/raised-button.component";
import {StrokedButtonComponent} from "../shared/components/buttons/stroked-button/stroked-button.component";
import {Type} from "@angular/core";
import {CalenderComponent} from "../shared/components/calender/calender/calender.component";

import {ImageComponent} from "../shared/components/image/image/image.component";
import {LabelComponent} from "../shared/components/headlines/label/label.component";

export interface FeatureConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface Feature {
  instanceId: string;
  configs: FeatureConfig;
  data: any;
  lock: boolean;
  componentId: string;

}

export interface FeatureGroup {
  title: string;
  icon?: string;
  children: Array<FeatureAction>
}

export interface FeatureAction {
  title: string;
  icon?: string;
  class?: string;
  component: Type<any>;

  componentId: string;
}

export const Features: Array<FeatureGroup> = [
  {
    title: 'Input',
    // icon: 'fa-sharp fa-regular fa-pen-field',
    children: [
      {
        title: 'text',
        class: 'text-input',
        component: TextInputComponent,
        componentId: '1'
      },
      {
        title: 'text-area',
        class: 'text-area',
        component: TextAreaInputComponent,
        componentId: '2'
      }
    ]
  },
  {
    title: 'Button',
    children: [
      {
        title: 'Basic',
        class:'basic-button',
        component: BasicButtonComponent,
        componentId: '3'

      },
      {
        title: 'raised',
        class: 'raised-button',
        component: RaisedButtonComponent,
        componentId: '4'

      },
      {
        title: 'stroked',
        class: 'stroked-button',
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
    title: 'Labels',
    icon: 'fa-solid fa-tag',
    children: [

      {
        title: 'Label',
        icon: 'fa-solid fa-tag',
        component: LabelComponent,
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
