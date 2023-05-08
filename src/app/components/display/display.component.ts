import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { DataService } from 'src/app/Services/DataServices/data.service';

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
  
  constructor(public dialog: MatDialog, private dataService:DataService) { }

  ngOnInit(): void {
        this.displaySearchresults()
  }  


  openDialog(note: any) {
    const dialogRef = this.dialog.open(UpdatenotesComponent, { data: note, });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Dialog result:",result);
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

  refreshDisplaydata(){
    this.updatenoteEvent.emit();
  }

}

