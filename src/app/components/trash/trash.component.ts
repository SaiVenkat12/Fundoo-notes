import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashnotesArray=[];

  constructor(private noteservice: NotesService) { }
  ngOnInit(): void {
    this.trashnotes()
  }

  trashnotes() {
    this.noteservice.getTrashnotes().subscribe((result: any) => {
      this.trashnotesArray=result.data.data;
      this.trashnotesArray.unshift();
      console.log(this.trashnotesArray);
      
    })
  }
  trashnotesRefresh(){
    this.trashnotes()
  }

}
