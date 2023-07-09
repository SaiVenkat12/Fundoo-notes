import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Output() updatenoteEvent = new EventEmitter<Object>();
  @Input() displayallnotes: any


  title: any
  description: any
  searchText:any
  excludedData = 'GMT+0000 (UTC)';
  view:boolean=true;
    
    constructor(public dialog: MatDialog, private dataService:DataService,private noteservice: NotesService) { }

  ngOnInit(): void {
        this.displaySearchresults()
        this.changeDisplayView()
        var gmtTimes = ["2023-06-19T10:00:00Z", "2023-06-19T15:30:00Z", "2023-06-19T18:45:00Z"];

// Function to convert GMT time to IST
function convertGMTtoIST(gmtTime:any) {
  var date = new Date(gmtTime);
  date.setHours(date.getHours() + 5); // Add 5 hours
  date.setMinutes(date.getMinutes() + 30); // Add 30 minutes
  return date;
}

// Convert each GMT time in the array to IST
var istTimes = gmtTimes.map(function(gmtTime) {
  return convertGMTtoIST(gmtTime);
});

// Display the converted IST times
console.log("GMT times:", gmtTimes);
console.log("IST times:", istTimes);
  }  


  openDialog(note: any) {
    const dialogRef = this.dialog.open(UpdatenotesComponent, { data: note, });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log("Dialog result:",result);
       this.updatenoteEvent.emit();
    });
  }

  displaySearchresults(){
    this.dataService.currentMessage.subscribe((result:any)=>{
      console.log(result);
      if(result!=='default message'){
        this.searchText=result;
      }
    })
  }

  changeDisplayView(){
    this.dataService.currentView.subscribe((res:any)=>{
      console.log(res);
      this.view=res;
      
    })
  }

  remove(labelId:any,noteId:any){
    this.noteservice.removeLabelToNotes(noteId,labelId).subscribe((res:any)=>{
      console.log(res);
      this.updatenoteEvent.emit();
    })
  }

  removeReminder(Id:any,reminder:any){
    let reqdata = {
      noteIdList: [Id],
      //reminder:reminder
    }
    this.noteservice.removeReminder(reqdata).subscribe((res:any)=>{
      console.log(res,"removed");
      this.updatenoteEvent.emit();
    })
  }

  refreshDisplaydata(){
    this.updatenoteEvent.emit();
  }

}

