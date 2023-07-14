import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { UserService } from 'src/app/Services/UserService/user.service';
import { NotesService } from 'src/app/Services/noteServices/notes.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {


  selectedFile: File | null = null;
  imageUrl: string | undefined;
  show: boolean = false;
  imagefile = new FormData();
  getImg:boolean = false;
  getImgUrl:any

  @ViewChild('fileInput') fileInput: any;
cropImgPreview: any;
imgChangeEvt: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddProfileComponent>,
    private userService: UserService, private dataService: DataService) { }
  ngOnInit(): void {
    if(localStorage.getItem('imageUrl') != null){
      this.getImg=true;
      this.getImgUrl=this.data+localStorage.getItem('imageUrl')
      console.log(this.data+localStorage.getItem('imageUrl'));
    }
  }

    

  save() {
    
    let reqData = {
    type:this.imagefile
    }

    this.userService.uploadProfilePic(this.imagefile).subscribe((res: any) => {
      console.log(res);
console.log(this.data);

    })
  }

  uploadFile() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imagefile.append('file', this.selectedFile);

      // Display the image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.show = !this.show;
      };
      reader.readAsDataURL(file);

      // You can also retrieve the file contents here if needed
      const contents = reader.result;
      console.log(contents);
    }
  }

  close() {
    this.dialogRef.close();
  }


  @ViewChild('myForm') myForm!: NgForm;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  selectImage(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }


  saveCroppedImage(form: NgForm) {
    if (this.croppedImage) {
      const formData = new FormData();
      const file = this.base64ToFile(this.croppedImage);
      formData.append('croppedImage', file, file.name);
      
      // Use the formData as needed (e.g., send it to an API endpoint)
      console.log(formData);

      // Reset the form and image cropper
      form.resetForm();
      this.imageChangedEvent = '';
      this.croppedImage = '';
    }
  }

  private base64ToFile(data: string) {
    const byteString = atob(data.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/png' });
    return new File([blob], 'croppedImage.png');
  }

  // Rest of the code...
}







