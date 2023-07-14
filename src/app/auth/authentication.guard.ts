import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardServiceService } from '../Services/auth-guard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authguardService:AuthGuardServiceService, private router:Router){}
  
  canActivate():boolean{
    if (!this.authguardService.gettoken()) {
      console.log("Using AuthGuard");
      
      this.router.navigateByUrl('/login');
      return false
    }
    return true
  }
  
}
