import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/UserService/user.service';
import { DataService } from 'src/app/Services/DataServices/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginform!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar,
    private dataService:DataService, private route: Router) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }
  login() {
    if (this.loginform.valid) {
      let reqdata = {
        email: this.loginform.value.email,
        password: this.loginform.value.password,
      }

      this.userService.loginService(reqdata).subscribe((result: any) => {
        console.log("Login function working", result);
        this.snackBar.open('Login Successfully!', '', { 
          duration: 2000 
        });
        localStorage.setItem('token', result.id);
        localStorage.setItem('userId',result.userId)
        localStorage.setItem('imageUrl',result.imageUrl)
        console.log("id=",result.id);
        this.route.navigateByUrl('/home');
        
      })
    }
    else {
      console.log("invalid data");
      this.snackBar.open('Login failed!', '', {
        duration: 1000
      });
    }
  }
}


