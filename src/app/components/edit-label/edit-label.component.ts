import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  title: any;
  newTitle: any;
  labelArray: any = [];
  id: any;
  show: boolean = true;
  changeIndex: number = -1;
  // showIcon:boolean=false;

  @Output() onDelete = new EventEmitter<any>;
  @Output() onCreate = new EventEmitter<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditLabelComponent>,
    private noteService: NotesService) {
    this.labelArray = data;

  }

  userId: any
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    console.log(this.userId);
    if (this.newTitle != undefined) {
      this.show = !this.show
      console.log(this.newTitle);
    }
    // else{
    //   console.log(this.newTitle);
    // }

  }

  clear() {
    this.newTitle = "";
    this.show = true;
  }

  done(event: any) {
    let text = event.target.value
    if (text != "") {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  createLabel() {
    let reqdata = {
      label: this.newTitle,
      isDeleted: false,
      userId: this.userId,
    }
    console.log(reqdata);

    if (this.newTitle != undefined) {
      this.noteService.createNoteLabels(reqdata).subscribe((res: any) => {
        console.log("create", res);
        this.data.push(reqdata);
        console.log("data", this.data);
        this.onCreate.emit();
        this.newTitle = "";
        console.log("create", this.data);

      })
    }
  }

  change(index: any) {
    console.log(index, "index");
    this.changeIndex = index;
  }

  submit() {
    this.createLabel();
    this.dialogRef.close();
  }

  delete(id: any, labelData: any) {
    console.log(id);
    this.noteService.deleteNoteLabels(id).subscribe((res: any) => {
      console.log("Deleted", res);
      let index = this.labelArray.indexOf(labelData);
      console.log(index);

      this.data.splice(index, 1);
      console.log("dialog", this.data);
      this.onDelete.emit();
    })
  }

  editLabel(id: any, Label: any) {
    let reqdata = {
      label: Label,
      isDeleted: false,
      userId: this.userId,
    }
    this.noteService.updateNoteLabels(reqdata, id).subscribe((res: any) => {
      console.log("updated", res);
    })
  }
}
