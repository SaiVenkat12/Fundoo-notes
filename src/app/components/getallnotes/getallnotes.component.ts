import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-getallnotes',
  templateUrl: './getallnotes.component.html',
  styleUrls: ['./getallnotes.component.scss']
})
export class GetallnotesComponent implements OnInit {

  allnotes = []
  constructor(private noteservice: NotesService) { }
  ngOnInit() {
    this.getall()
  }
  getrefreshEvent(eventdata: any) {
    this.allnotes.unshift();
    console.log("refresh data");

  }
  getall() {

    this.noteservice.getallnotes().subscribe((result: any) => {
      console.log(result);
      this.allnotes = result.data.data.reverse();
      this.allnotes = this.allnotes.filter((notes: any) => notes.isDeleted === false && notes.isArchived === false)
      console.log(this.allnotes);
    })
  }


}
