import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  @Output() updatenoteEvent = new EventEmitter<Object>();
  @Input() displayallnotes: any

  showButton: boolean = true;
  title: any
  description: any
  
  constructor(public dialog: MatDialog) { }

  openDialog(note: any) {
    const dialogRef = this.dialog.open(UpdatenotesComponent, { data: note, });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:",result);
      this.updatenoteEvent.emit(result);
    });

  }

}

