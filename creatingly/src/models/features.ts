import {TextInputComponent} from "../shared/components/text-input/text-input.component";
import {ImageComponent} from "../shared/components/image/image.component";
import {TextAreaInputComponent} from "../shared/components/text-area-input/text-area-input.component";
import {CalenderComponent} from "../shared/components/calender/calender.component";
import {LabelComponent} from "../shared/components/label/label.component";
import {Type} from "@angular/core";
import {ButtonComponent} from "../shared/components/button/button.component";


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

export interface FeatureList {
  title: string;
  icon?: string;

  component: Type<any>;
  componentId: string;

}

export const Features: Array<FeatureList> = [
  {
    title: 'Input',
    // class: 'text-input',
    component: TextInputComponent,
    componentId: '1',
  }, {
    title: 'Text-Area',
    // class: 'text-area',
    component: TextAreaInputComponent,
    componentId: '2'
  },
  {
    title: 'Button',
    // class: 'raised-button',
    component: ButtonComponent,
    componentId: '3'
  },
  {
    title: 'calender',
    // icon: 'fa-solid fa-calendar-days',
    componentId: '4',
    component: CalenderComponent
  },
  {
    title: 'Label',
    // icon: 'fa-solid fa-tag',
    component: LabelComponent,
    componentId: '5'
  },
  {
    title: 'Image',
    // icon: 'fa-solid fa-image',
    component: ImageComponent,
    componentId: '6'
  }
]


export const getFeatureById: (id: string) => undefined | FeatureList = (id: string) => {
  return Features.find(item => item.componentId === id)

}
