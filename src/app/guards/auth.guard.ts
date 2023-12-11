import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { ExtendedUser } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const requiredRoles = route.data['roles'] as string[];
    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }
    return this.authService.isLogedIn().then((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
          return false;
        }
        const userRole = (this.authService.user as ExtendedUser).role;
        return requiredRoles.includes(userRole);
      });
  }
}