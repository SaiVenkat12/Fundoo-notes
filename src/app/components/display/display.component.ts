import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Output() updatenoteEvent = new EventEmitter<Object>();
  @Input() displayallnotes: any;
  @Input() pinnedNotesData: any;
  @Input() showPinned: any;

  title: any
  description: any
  searchText: any
  excludedData = 'GMT+0000 (UTC)';
  view: boolean = true;
  pinned: boolean = false;
  viewCheckBoxs: boolean = false;
  showClose: boolean = false;
  data3:any=[]

  constructor(public dialog: MatDialog, private dataService: DataService, private noteservice: NotesService) { }

  ngOnInit(): void {
    this.displaySearchresults();
    this.changeDisplayView();
    
    var gmtTimes = ["2023-06-19T10:00:00Z", "2023-06-19T15:30:00Z", "2023-06-19T18:45:00Z"];

    // Function to convert GMT time to IST
    function convertGMTtoIST(gmtTime: any) {
      var date = new Date(gmtTime);
      date.setHours(date.getHours() + 5); // Add 5 hours
      date.setMinutes(date.getMinutes() + 30); // Add 30 minutes
      return date;
    }

    // Convert each GMT time in the array to IST
    var istTimes = gmtTimes.map(function (gmtTime) {
      return convertGMTtoIST(gmtTime);
    });

  }

  


  openDialog(note: any) {
    const dialogRef = this.dialog.open(UpdatenotesComponent, { data: note, });

    //console.log(note.noteCheckLists[0].itemName);
    

    dialogRef.afterClosed().subscribe((result) => {
      //console.log("Dialog result:",result);
      this.updatenoteEvent.emit();
    });
  }

  displaySearchresults() {
    this.dataService.currentMessage.subscribe((result: any) => {
      console.log(result);
      if (result !== 'default message') {
        this.searchText = result;
      }
    })
  }

  changeDisplayView() {
    this.dataService.currentView.subscribe((res: any) => {
      console.log(res);
      this.view = res;

    })
  }

  remove(labelId: any, noteId: any) {
    this.noteservice.removeLabelToNotes(noteId, labelId).subscribe((res: any) => {
      console.log(res);
      this.updatenoteEvent.emit();
    })
  }

  removeReminder(Id: any, reminder: any) {
    let reqdata = {
      noteIdList: [Id],
      //reminder:reminder
    }
    this.noteservice.removeReminder(reqdata).subscribe((res: any) => {
      console.log(res, "removed");
      this.updatenoteEvent.emit();
    })
  }

  refreshDisplaydata() {
    this.updatenoteEvent.emit();
  }

  pinNote(Id: any) {
    this.pinned = !this.pinned;
    console.log(this.pinned);
    let reqData = {
      noteIdList: [Id],
      isPined: this.pinned
    }

    this.noteservice.pinAndUnpinNotes(reqData).subscribe((res: any) => {
      this.refreshDisplaydata()
    })

  }

}

