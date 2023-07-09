import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/noteServices/notes.service';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { UserService } from 'src/app/Services/UserService/user.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { ElementRef } from '@angular/core';


@Component({
  selector: 'app-collabrator',
  templateUrl: './collabrator.component.html',
  styleUrls: ['./collabrator.component.scss']
})
export class CollabratorComponent implements OnInit {

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger | any;

  noteData: any = []
  collabData: any = []
  searchWord: any=''
  word: string = ''
  searchResult: any
  userData: any
  show: boolean = true;
  showSearch: boolean = false;
  collabUser: any


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditLabelComponent>,
    private noteService: NotesService, private userService: UserService) {
    this.noteData = data;
    this.collabData = this.noteData.collaborators;
  }
  
ngOnInit(): void {
}

  selectEmail(email: any, data: any) {
    console.log(email);
    this.searchWord = email
    this.collabUser = data
    this.save(email)
  }
  

  done(event: any) {
    
    console.log(event.target.value);
    this.searchWord = event.target.value;
    if (this.searchWord != "") {
      console.log("search");
      this.menuTrigger.openMenu();
      this.show = false;
      this.showSearch=true;
      this.save(this.searchWord)
    } else {
      this.show = true;
      this.showSearch=false;
      this.menuTrigger.closeMenu();
    }


  }
  addUser() {
    console.log(this.collabUser);
    this.show = true;
    console.log(this.noteData.id);

    let reqData = {
      firstName: this.collabUser.firstName,
      lastName: this.collabUser.lastName,
      email: this.collabUser.email,
      userId: this.collabUser.userId
    }

    this.noteService.addCollabrator(reqData, this.noteData.id).subscribe((res: any) => {
      console.log(res);
      this.collabData.push(reqData);
      this.searchWord=""
      this.showSearch=false;
    })

  }
  deleteUser(user: any) {

    this.noteService.removeCollabrator(this.noteData.id, user.userId).subscribe((res: any) => {
      console.log("deleted",res);
      let index=this.collabData.indexOf(user);
      console.log(index);
      
      this.collabData.splice(index,1);
    })

  }

  cancel() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close();
  }

  save(word: any) {
    let reqData = {
      searchWord: word
    }
    this.searchResult = word;
    this.userService.searchUserList(reqData).subscribe((res: any) => {
      console.log(res);
      this.userData = res.data.details;
      console.log(this.userData);
    })
    //this.dialogRef.close();
  }

}
