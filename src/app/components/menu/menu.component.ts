import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  isLogged: boolean = false;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
