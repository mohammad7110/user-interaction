import {Component, ViewChild} from '@angular/core';
import {FeatureAction} from "../models/features";
import {DynamicHostDirective} from "../shared/directives/dynamic-host/dynamic-host.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

  selectAction(action: FeatureAction) {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.createComponent(action.component);
  }

  onResize($event: { width: number; height: number }) {
      console.log($event)
  }
}
