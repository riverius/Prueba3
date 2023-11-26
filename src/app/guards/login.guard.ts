import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private stateService:StateService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLogged:boolean = false;
      this.stateService.isLoggedIn.subscribe((value)=>{
        isLogged = value;
        if(!isLogged){
          this.router.navigate(['/login']);
        }
      });
    return isLogged;
  }
}
