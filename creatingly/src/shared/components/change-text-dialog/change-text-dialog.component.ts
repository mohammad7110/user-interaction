import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-change-text-dialog',
  templateUrl: './change-text-dialog.component.html',
  styleUrls: ['./change-text-dialog.component.scss']
})
export class ChangeTextDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public date: { control: FormControl, label: string } , private dialogRef:MatDialogRef<ChangeTextDialogComponent>) {

  }

  close():void {
    this.dialogRef.close();
  }
}
