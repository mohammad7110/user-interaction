import { Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends FeatureGeneric {
  minWidth = 60;
  minHeight = 60;
  constructor(public override renderer: Renderer2, public override messageService: MessageService,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, dialog);
  }

  changeImage($event: any) {
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      if (evt.target) {
        this.formGroup.get('src')?.patchValue(evt.target.result as string)
      }
    };

    fileReader.readAsDataURL($event.target.files[0]);
  }
}
