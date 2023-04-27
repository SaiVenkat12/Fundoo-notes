import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpService: HttpService) { }
  signupService(reqSignup: any) {

    console.log("User Services");
    return this.httpService.postService('user/userSignup', reqSignup, false, {})
  }

  loginService(reqdata:any){
    return this.httpService.getService('user/userLogin',  false, {})
  }

}
