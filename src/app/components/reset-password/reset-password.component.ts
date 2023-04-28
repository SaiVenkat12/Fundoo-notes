import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/UserService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetform!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private userService: UserService) { }

  ngOnInit() {
    this.resetform = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]]

    });

  }
  reset() {
    if(this.resetform.valid){
      console.log("reset function working", this.resetform.value);
    }
    else{
      console.log("invalid data");
    }
  }

}
