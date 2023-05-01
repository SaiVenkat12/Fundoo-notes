import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/UserService/user.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  Recoveryform!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private userService: UserService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.Recoveryform = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],

    });

  }
  Recovery() {
    if(this.Recoveryform.valid){
      let recoverdata={
        email: this.Recoveryform.value.email,
      };
      console.log("Valid data",recoverdata)
      this.userService.forgotpassword(recoverdata).subscribe((result: any) => {
        console.log("result")
       // localStorage.setItem('token', result.id);
        console.log("Recovery function working", recoverdata);
        this.snackBar.open('Valid Email', '', { 
          duration: 2000 });
          //this.route.navigateByUrl('/reset-password');
      })

    }
    else{
      this.snackBar.open('InValid Email', '', { 
        duration: 2000 });
      console.log("invalid data");
    }
  }

}
