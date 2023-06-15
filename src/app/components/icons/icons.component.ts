import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() noteinfo: any 
  @Input() colorchange: string=''
  @Output() refreshpageEvent = new EventEmitter<any>();
  @Output() backgroundColorChanged = new EventEmitter<string>();

  show: boolean = true;
  labelArray:any=[]
  keepMenuOpen = true;
  noteArray:any=[];
  checkedLabels:any=[];

  constructor(private noteservice: NotesService,private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLabelData()
    this.getNoteInfo()
  }

  getNoteInfo(){
    
    
    if(this.noteinfo!=null){
      if(this.noteinfo.isDeleted===true){
        this.show=false;
      }
    }
    else{
      this.show=true;
    }

  }

  getLabelData(){
    this.dataService.currentLabelMessage.subscribe((res)=>{
      this.labelArray=res;
      //console.log(this.labelArray);
    })
    
  }

  onMenuOpened(){
    console.log("labels",[this.noteinfo.noteLabels]);
    this.checkedLabels=[]
    for(let i=0;i<(this.noteinfo.noteLabels).length;i++){
      let id=([this.noteinfo.noteLabels[i].id]).toString()
      this.checkedLabels.push(id)
    }
    ;
      console.log("checked",this.checkedLabels);
  }
  onMenuClosed(){
    this.refreshpageEvent.emit();
  }

  AddNoteReminder(){
    let reqdata = {
      title:[this.noteinfo.title].toString(),
      noteIdList: [this.noteinfo.id],
      reminder:["jun 23, 8:00AM"]
    }
    console.log(reqdata);
    
    this.noteservice.AddReminder(reqdata).subscribe((res)=>{
      console.log(res);
    })
  }
  

  selectLabel(event:any,label:any){
    if(event.target.checked){
      let reqdata = {
        noteId: [this.noteinfo.id],
        lableId:label
      }
      // console.log(reqdata.noteId);
      // console.log(label);
      this.noteservice.addLabeltoNotes(reqdata.noteId,label).subscribe((result)=>{
        console.log("label added",result);
        
      })
      
    }
  }
  searchLabel(event:any){
    console.log(event.target.value);
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
    this.colorchange=bgcolor;
    console.log(this.colorchange);
    this.backgroundColorChanged.emit(this.colorchange);

    if(this.noteinfo!=null){
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
}
