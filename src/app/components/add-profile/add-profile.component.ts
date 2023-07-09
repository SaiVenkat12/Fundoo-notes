import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent {
  selectedFile: File | null = null;
  imageUrl: string | undefined;
  show:boolean=false;

  @ViewChild('fileInput') fileInput: any;

  constructor(private userService:UserService){}

  uploadProfile(){
    const imagefile = new FormData();

    //imagefile.append('file', this.profilepic)
    let reqData={
      
    }

    this.userService.uploadProfilePic(reqData).subscribe((res:any)=>{
      console.log(res);
      
    })
  }

  uploadFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Display the image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.show=!this.show;
      };
      reader.readAsDataURL(file);

      // You can also retrieve the file contents here if needed
      const contents = reader.result;
      console.log(contents);
    }
  }
}
