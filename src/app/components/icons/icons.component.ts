import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() noteinfo: any
  @Output() refreshpageEvent = new EventEmitter<any>();

  show: boolean = true;

  color2="#f28b82";

  constructor(private noteservice: NotesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.noteinfo!=null){
      if(this.noteinfo.isDeleted===true){
        this.show=false;
      }
    }
    else{
      this.show=true;
    }
  }

  Delete() {
    let reqdata = {
      noteIdList: [this.noteinfo.id],
      isDeleted: true,
    }
    this.noteservice.deletenote(reqdata).subscribe((result) => {
      console.log("deleted", result);
      this.refreshpageEvent.emit(result);
      this.snackBar.open('note trashed', '', {
        duration: 2000,
      });
    })
  }

  deleteForver(){
    let reqdata = {
      noteIdList: [this.noteinfo.id],
    }
    this.noteservice.deletenotesForever(reqdata).subscribe((result:any)=>{
      console.log(result);
      
      this.refreshpageEvent.emit(result);
      this.snackBar.open('note deleted', '', {
        duration: 2000,
      });
    })
  }

  restore(){
    let reqdata = {
      noteIdList: [this.noteinfo.id],
      isDeleted: false,
    }
    
    this.noteservice.deletenote(reqdata).subscribe((result: any) => {
      console.log(result);
      this.refreshpageEvent.emit(result);
      this.snackBar.open('note restored', '', {
        duration: 2000,
      });
    })
  }

  archivenote() {
    let reqdata = {
      noteIdList: [this.noteinfo.id],
      isArchived: true,
    }
    this.noteservice.archive(reqdata).subscribe((result: any) => {
      console.log("archived", result);
      this.refreshpageEvent.emit(result);
      this.snackBar.open('note archived', '', {
        duration: 2000,
      });
    })
  }

  noteColor(bgcolor:string){
    let reqdata = {
      noteIdList: [this.noteinfo.id],
      color: bgcolor,
    }
    this.noteservice.notebgColorChange(reqdata).subscribe((result: any) => {
      console.log("BgColor Changed", result);
      this.refreshpageEvent.emit(result);
    })
  }
}
