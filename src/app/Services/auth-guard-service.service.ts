import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  constructor() { }
  gettoken(){  
    console.log("service");
    let token=localStorage.getItem('token');
    console.log(token);
    
    return token; 
     
    }  
}
