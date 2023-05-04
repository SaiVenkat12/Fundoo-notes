import { Component, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  @Input() displayallnotes:any

  showButton: boolean = false;
  title : any
  description : any

 constructor(private dialog: MatDialog){}
 
  openDialog(note:any){
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      data: note,
    })
  }
}
