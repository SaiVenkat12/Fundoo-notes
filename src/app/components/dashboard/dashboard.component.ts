import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { NotesService } from 'src/app/Services/noteServices/notes.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  mobileQuery: MediaQueryList;
  isSelected =false;
  show: boolean = true;
  

  labels:any;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService: DataService,
    public dialog: MatDialog,private noteService:NotesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getAllLabels()
  }
  searchbg(){
    this.isSelected=true; 
  }

  showside(e: any) {
    //this.show = e.target.Changed;
    this.show = !this.show;
  }

  searchNote(event: any) {
    console.log(event.target.value);
    this.dataService.changeMessage(event.target.value);

  }
  getAllLabels(){
    this.noteService.getNoteLabels().subscribe((res:any)=>{
      this.labels=res.data.details;
      console.log("labels",res);
      console.log(this.labels);
      
      
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(EditLabelComponent, {data:this.labels});

    dialogRef.componentInstance.onDelete.subscribe((res:any)=>{
      console.log("all Labels");
        this.getAllLabels()
        this.labels=res;
        //dialogRef.afterClosed()
      //this.openDialog()
      //const dialogRef = this.dialog.open(EditLabelComponent, {data:res});
      });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllLabels()
      
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
