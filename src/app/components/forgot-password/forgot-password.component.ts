import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  Recoveryform!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Recoveryform = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],

    });

  }
  Recovery() {
    if(this.Recoveryform.valid){
      console.log("Recovery function working", this.Recoveryform.value);
    }
    else{
      console.log("invalid data");
    }
  }

}
