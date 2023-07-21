import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
import { CollabratorComponent } from '../collabrator/collabrator.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() noteinfo: any
  @Input() colorchange: string = '';
  @Input() newNote: boolean = false;
  @Output() refreshpageEvent = new EventEmitter<any>();
  @Output() backgroundColorChanged = new EventEmitter<string>();

  //date = new FormControl(new Date());
  date = new Date();
  selectDate = new Date();
  remindDate = new Date();
  remindTime: any
  remindTime2: number = 8

  show: boolean = true;
  labelArray: any = []
  keepMenuOpen = true;
  noteArray: any = [];
  checkedLabels: any = [];
  labelTitle: boolean = true;
  daysUntilNextMonday: any
  isRemind: boolean = true;
  showcheckbox: boolean = false;


  showOptions: boolean = false;


  constructor(private noteservice: NotesService, private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLabelData()
    this.getNoteInfo()
    // Find the next Monday
    this.daysUntilNextMonday = (1 + 7 - this.date.getDay()) % 7;
    console.log("mon", this.daysUntilNextMonday);
    if (this.daysUntilNextMonday === 0) {
      this.daysUntilNextMonday = 7;
    }
    this.remindDate.setHours(20, 0, 0, 0)
    if (this.date >= this.remindDate) {
      this.isRemind = false;
    }

  }
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  open() {
    console.log(this.noteinfo);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollabratorComponent, { data: this.noteinfo });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshpageEvent.emit();
    });

  }
  getLabelData() {
    if (!this.newNote) {
      this.dataService.currentLabelMessage.subscribe((res) => {
        this.labelArray = res;
      })
    }

    //console.log(this.labelArray);
  }

  checkboxs() {
    this.showcheckbox = !this.showcheckbox;
    this.dataService.getCheckboxData(this.showcheckbox);
    const dialogRef = this.dialog.open(UpdatenotesComponent, { data: this.noteinfo });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshpageEvent.emit();

    });
  }

  setDate(noOfDays: any) {
    const remainderDate = new Date()
    remainderDate.setDate(remainderDate.getDate() + noOfDays);
    if (noOfDays === 0) {
      console.log(noOfDays);
      remainderDate.setHours(20, 0, 0, 0);
      console.log(remainderDate.toLocaleTimeString());
    }
    else {
      console.log(noOfDays);
      remainderDate.setHours(8, 0, 0, 0);
    }
    remainderDate.setHours(remainderDate.getHours() + 5);
    remainderDate.setMinutes(remainderDate.getMinutes() + 30);

    if (remainderDate.getTime() <= this.date.getTime()) {
      remainderDate.setDate(remainderDate.getDate() + noOfDays);
    }
    console.log(remainderDate);

    console.log(this.selectDate);

    let reqdata = {
      noteIdList: [this.noteinfo.id],
      reminder: remainderDate
    }
    console.log(reqdata);

    this.noteservice.AddReminder(reqdata).subscribe((res) => {
      console.log(res);
      this.refreshpageEvent.emit();
    })
  }
  AddNoteReminder() {

    console.log(this.selectDate);

    if (this.remindTime) {
      var [hours, minutes] = this.remindTime.split(':');
      console.log(this.remindTime, "1");

      console.log('Hours:', hours);
      console.log('Minutes:', minutes);
      this.selectDate.setHours(this.selectDate.getHours() + hours);
      this.selectDate.setMinutes(this.selectDate.getMinutes() + minutes);
    }
    else {
      console.log(this.remindTime2, "2");
      this.selectDate.setHours(this.remindTime2, 0, 0, 0);
    }
    this.selectDate.setHours(this.selectDate.getHours() + 5);
    this.selectDate.setMinutes(this.selectDate.getMinutes() + 30);
    let reqdata = {
      noteIdList: [this.noteinfo.id],
      reminder: this.selectDate
    }
    console.log(reqdata);

    this.noteservice.AddReminder(reqdata).subscribe((res) => {
      console.log(res);
      this.refreshpageEvent.emit();
    })
  }


  getNoteInfo() {


    if (this.noteinfo != null) {
      if (this.noteinfo.isDeleted === true) {
        this.show = false;
        console.log(this.show);
      }
    }
    else {
      this.show = true;
    }

  }


  onMenuOpened() {
    //console.log("labels", [this.noteinfo.noteLabels]);
    this.checkedLabels = []
    for (let i = 0; i < (this.noteinfo.noteLabels).length; i++) {
      let id = ([this.noteinfo.noteLabels[i].id]).toString()
      this.checkedLabels.push(id)
    }
    if (this.checkedLabels.length > 0) {
      this.labelTitle = !this.labelTitle;
    }
    console.log("checked", this.checkedLabels);
  }
  onMenuClosed() {
    this.refreshpageEvent.emit();
  }

  AddNoteReminderNextWeek() {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
    nextWeek.setHours(8, 0, 0, 0);
    if (nextWeek.getTime() <= currentDate.getTime()) {
      nextWeek.setDate(nextWeek.getDate() + 1);
    }

    let reqdata = {
      noteIdList: [this.noteinfo.id],
      reminder: nextWeek
    }
    console.log(reqdata);

    this.noteservice.AddReminder(reqdata).subscribe((res) => {
      console.log(res);
      this.refreshpageEvent.emit();
    })
  }





  selectLabel(event: any, label: any) {
    if (event.target.checked) {
      let reqdata = {
        noteId: [this.noteinfo.id],
        lableId: label
      }
      // console.log(reqdata.noteId);
      // console.log(label);
      this.noteservice.addLabeltoNotes(reqdata.noteId, label).subscribe((result) => {
        console.log("label added", result);

      })

    }
  }
  searchLabel(event: any) {
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

  deleteForver() {
    let reqdata = {
      noteIdList: [this.noteinfo.id],
    }
    this.noteservice.deletenotesForever(reqdata).subscribe((result: any) => {
      console.log(result);

      this.refreshpageEvent.emit(result);
      this.snackBar.open('note deleted', '', {
        duration: 2000,
      });
    })
  }

  restore() {
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




  noteColor(bgcolor: string) {
    this.colorchange = bgcolor;
    console.log(this.colorchange);
    this.backgroundColorChanged.emit(this.colorchange);

    if (this.noteinfo != null) {
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
