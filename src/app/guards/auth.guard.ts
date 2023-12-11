import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userPromise = this.authService.getUser();
  
    return userPromise.then((user) => {
      if (!user) {
        this.router.navigateByUrl('/login');
        return false;
      }
  
      const allowedRoles = route.data['roles'] || [];
  
      if (!allowedRoles.includes(user.role)) {
        switch (user.role) {
          case 'admin':
            this.router.navigateByUrl('/admin');
            break;
          case 'teacher':
            this.router.navigateByUrl('/dashboard');
            break;
          case 'student':
            this.router.navigateByUrl('/qrscanner');
            break;
          default:
            this.router.navigateByUrl('/home');
            break;
        }
        return false;
      }
      return true;
    }).catch((error) => {
      console.error(error);
      return false;
    });
  }
}