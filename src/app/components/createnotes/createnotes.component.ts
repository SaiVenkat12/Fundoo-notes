import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {
  @Output() createnoteRefreshEvent = new EventEmitter<Object>();

  Title = '';
  description = '';

  show: boolean = true;
  constructor(private noteservice: NotesService) { }
  ngOnInit(): void {

  }

  showing() {
    this.show = false
  }

  closenote() {
    if(this.Title || this.description !== '')
    {
      
      let reqdata = {
      title: this.Title,
      description: this.description,
    }
    console.log(reqdata);
    
    this.noteservice.createnote(reqdata).subscribe((result:any)=>{
      console.log(result);
      this.createnoteRefreshEvent.emit(result.status.details);
    })

    this.Title='';
    this.description='';
    this.show = true;
    
    }
    else{
      this.show = true;
      console.log("no data");
      
    }
  }

}
