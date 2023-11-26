import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  isLogged: boolean = false;
  constructor(private stateService:StateService, private router:Router) { }

  ngOnInit() {
    this.stateService.getIsLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLogged = loggedIn;
    });
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  logout() {
    this.stateService.logout();
    this.router.navigate(['/home']);
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
