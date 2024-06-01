import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FeatureGeneric} from "../feature-generic/feature-generic.component";
import {MessageService} from "../../../services/message/message.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends FeatureGeneric {

  constructor(public override renderer: Renderer2, public override messageService: MessageService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, messageService, cdr, dialog);
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
