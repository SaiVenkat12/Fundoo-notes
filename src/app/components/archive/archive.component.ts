import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archivenotesArray=[];

  constructor(private noteservice: NotesService) { }
  ngOnInit(): void {
    this.archivenotes()
  }

  archivenotes() {
    this.noteservice.getArchivenotes().subscribe((result: any) => {
      this.archivenotesArray=result.data.data;
      this.archivenotesArray.unshift();
      console.log("archived",this.archivenotesArray);
      
    })
  }

}