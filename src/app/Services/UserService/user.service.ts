import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  token:any

  constructor(private httpService: HttpService) { }

  signupService(reqSignup: any) {

    let httpHeadersOption = {
      headers : new HttpHeaders({ 
        contentType : 'application/json',
        authorization : this.token
      })
    }

    console.log("User Services");
    return this.httpService.postService('user/userSignup', reqSignup, false, httpHeadersOption)
  }

  loginService(reqdata:any){

    let httpHeadersOption = {
      headers : new HttpHeaders({ 
        contentType : 'application/json',
        authorization : this.token
      })
    }
    console.log("User login Services");
    return this.httpService.postService('user/login', reqdata, false, httpHeadersOption)
  }

}
