import {ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {FeatureGeneric} from "../../feature-generic/feature-generic.component";
import {CommunicationService} from "../../../../services/communication/communication.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends FeatureGeneric {

  constructor(public override renderer: Renderer2, public override communicationService: CommunicationService, public override cdr: ChangeDetectorRef,
              public override dialog: MatDialog
  ) {
    super(renderer, communicationService, cdr, dialog);
  }

  changeImage($event: any) {
    const fileReader = new FileReader();
    fileReader.onload = (evt) => {
      if (evt.target) {
        console.log(evt.target.result)
        this.formGroup.get('src')?.patchValue(evt.target.result as string)
      }
    };

    fileReader.readAsDataURL($event.target.files[0]);
  }
}
