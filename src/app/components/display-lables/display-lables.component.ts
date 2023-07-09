import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-display-lables',
  templateUrl: './display-lables.component.html',
  styleUrls: ['./display-lables.component.scss']
})
export class DisplayLablesComponent {

  allnotes:any=[]
  constructor(private route: ActivatedRoute, private noteService:NotesService) { }
  ngOnInit() {
    this.getLabelData()
    
  }
  getLabelData(){
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const label = this.route.snapshot.paramMap.get('labelName');
      this.getLabel(label)
    });
  }

  getLabel(Label:any){
    this.noteService.getNotesListbyLabel(Label).subscribe((res:any)=>{
        console.log(res);
        console.log(res.data.data);
        this.allnotes=res.data.data;
      })

  }
  getall(){
    console.log("refresh");
    this.getLabelData()
  }
}
  

