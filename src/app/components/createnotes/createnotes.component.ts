import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  backgroundColor='';
  createNote: boolean = true;
  show: boolean = true;
  pined: boolean = false;
  constructor(private noteservice: NotesService) { }
  ngOnInit(): void {
    
  }

  onBackgroundColorChanged(color: string) {
    this.backgroundColor = color;
    console.log(this.backgroundColor);
    
  }
  

  showing() {
    this.show = false
  }

  pinNote(){
    this.pined=!this.pined;
  }

  closenote() {
    if(this.Title || this.description !== '')
    {
      
      let reqdata = {
      title: this.Title,
      description: this.description,
      color:this.backgroundColor,
      isPined:this.pined
    }
    console.log(reqdata);
    
    this.noteservice.createnote(reqdata).subscribe((result:any)=>{
      console.log(result);
      this.createnoteRefreshEvent.emit(result.status.details);
    })

    this.Title='';
    this.description='';
    this.backgroundColor='';
    this.show = true;
    
    }
    else{
      this.show = true;
      this.backgroundColor='';
      console.log("no data");
      
    }
  }

}
