import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.scss']
})

export class UpdatenotesComponent {
  title: string;
  description: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatenotesComponent>, private noteservice: NotesService) {
    this.title = data.title;
    this.description = data.description;
  }
  close() {
    let reqdata = {
      noteId: this.data.id,
      title: this.title,
      description: this.description,
    }
    this.noteservice.updatenotes(reqdata).subscribe((result: any) => {
      console.log("data",reqdata);
      console.log('title',this.title);
      console.log(result.data.title);
      
      console.log("update: ",result.data);
      this.dialogRef.close();
    })
  }

}
