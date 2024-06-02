import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { FeatureList, Features} from "../../models/features";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent {
  @Output() action = new EventEmitter<FeatureList>();
  features = Features;
  selectedGroup?: FeatureList;
  @ViewChild(MatMenuTrigger, {static: true}) menuTrigger !: MatMenuTrigger;
  menuConfig = {
    x: 0,
    y: 0
  }

  selectGroup(group: FeatureList) {
    if (group.title === 'cursor' || (this.selectedGroup && this.selectedGroup === group)) {
      this.selectedGroup = undefined;
    } else {
      this.selectedGroup = group;
    }
  }

  selectAction(action: FeatureList): void {
    this.selectedGroup = undefined;
    this.action.emit(action);
  }
}
