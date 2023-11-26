import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title: string = 'Ingresar al Portal Academico';
  username: string = '';
  password: string = '';
  constructor(private stateService:StateService, private router:Router) { }

  ngOnInit() {
  }

  login() {
    if (this.stateService.login(this.username, this.password)) {
      this.router.navigate(['dashboard']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }

  recovery() {
    this.router.navigate(['/recovery']);
  }
}