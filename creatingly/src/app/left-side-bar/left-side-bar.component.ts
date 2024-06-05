import {Component, EventEmitter, Output} from '@angular/core';
import { FeatureList, Features} from "../../models/features";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent {
  @Output() action = new EventEmitter<FeatureList>();
  features = Features;


  selectAction(action: FeatureList): void {
    this.action.emit(action);
  }
}
