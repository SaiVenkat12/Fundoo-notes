import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserService/user.service';
import { AddProfileComponent } from 'src/app/components/add-profile/add-profile.component';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  mobileQuery: MediaQueryList;
  isSelected =false;
  show: boolean = true;
  listView:boolean=false;
user:any=[]
  labels:any;
  imageUrl:any;
  baseImageUrl="http://fundoonotes.incubation.bridgelabz.com/";
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService: DataService, private userService:UserService,
    private route: Router,
    public dialog: MatDialog,private noteService:NotesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getAllLabels()
    //this.getUserData()
    this.getImage()
  }

  searchbg(){
    this.isSelected=true; 
  }

  getImage(){
this.imageUrl=this.baseImageUrl+localStorage.getItem('imageUrl')
console.log("image",this.imageUrl);

  }

  refreshView(){
    this.listView=false;
    this.dataService.ChangeView(this.listView);
  }

  changeView(){
    this.listView=!this.listView;
    console.log(this.listView);
    this.dataService.ChangeView(this.listView);
  }

  logout(){
    this.userService.signout().subscribe((res:any)=>{
      this.dataService.setTokenData("");
      this.userService.setToken()
    })
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
      this.dataService.sendLabelsData(this.labels)
      
    })
  }
  redirectToLabel(label:any){
    console.log(label);
    this.noteService.getNotesListbyLabel(label).subscribe((res:any)=>{
      console.log(res);
      console.log(res.data.data);
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate(['home/Label/'+label]);
      });
      
      console.log("refresh");
      
    })
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(EditLabelComponent, {data:this.labels});

    dialogRef.componentInstance.onDelete.subscribe((res:any)=>{
      console.log("all Labels");
        this.getAllLabels()
        this.labels=res;
      });
      dialogRef.componentInstance.onCreate.subscribe((res:any)=>{
        console.log("all Labels");
          this.getAllLabels()
        });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllLabels()
      
    });
  }
  openProfileDialog(){
    const dialogRef = this.dialog.open(AddProfileComponent, {data:this.baseImageUrl});

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
