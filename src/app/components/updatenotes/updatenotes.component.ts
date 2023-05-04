import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.scss']
})

export class UpdatenotesComponent {
  title='';
  description='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdatenotesComponent>) {
    this.title=data.title;
    this.description=data.description;
  }
  close(){

  }

}
