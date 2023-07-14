import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-getallnotes',
  templateUrl: './getallnotes.component.html',
  styleUrls: ['./getallnotes.component.scss']
})
export class GetallnotesComponent implements OnInit {

  allnotes:any
  pinedNotes:any
  constructor(private noteservice: NotesService,private dataService:DataService) { }
  ngOnInit(){
    this.getall()
    this.getRemiders()
  }
  
  getrefreshEvent(eventdata:any){
    this.allnotes.unshift(eventdata);
    console.log("refresh data");
  }

  getall(){

    this.noteservice.getallnotes().subscribe((result:any)=>{
      console.log(result);
      this.dataService.userId(result);
      this.allnotes=result.data.data.reverse();
      this.allnotes=this.allnotes.filter((notes:any)=>notes.isDeleted===false && notes.isArchived===false )
      this.pinedNotes=(result.data.data).filter((notes:any)=>notes.isPined===true);
      console.log(this.allnotes);
      console.log("pinned notes",this.pinedNotes);
      
    })
  }
  
  getRemiders(){
   this.noteservice.getReminderNotes().subscribe((res:any)=>{
    console.log(res.data.data);
    
   }) 
  }
}
