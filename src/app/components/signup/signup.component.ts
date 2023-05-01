import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupform!: FormGroup;
  submitted = false;
  showPassword: boolean=false;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private userService: UserService, private route: Router) { }

  ngOnInit() {
    
    this.signupform = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      lastname: ['', [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  showHidePassword(e: any) {
    this.showPassword = e.target.checked;
  }
  
  signup() {
    if (this.signupform.value.confirmpassword === this.signupform.value.password) {
      if (this.signupform.valid) {

        let reqSignup = {
          firstName: this.signupform.value.firstname,
          lastName: this.signupform.value.lastname,
          service: "advance",
          email: this.signupform.value.email,
          password: this.signupform.value.password,
        }
        this.userService.signupService(reqSignup).subscribe((result: any) => {
          console.log("signup function working", reqSignup);
          this.snackBar.open('Account created Successfully!', '', { 
            duration: 2000 });
            this.route.navigateByUrl('/login');
        })
      }
      else {
        console.log("invalid data");
        this.snackBar.open('SignUp failed!', '', {
          duration: 1000
        });
      }
    }
    else {
      console.log('error:both passwords are not same!');
      this.snackBar.open("Those passwords didn't match. Try again!", '', {
        duration: 2000
      });
    }

  }
}
