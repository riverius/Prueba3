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
  typeUser: string = '';
  constructor(private stateService:StateService, private router:Router) { }

  ngOnInit() {
  }

  async login() {
    const user = await this.stateService.login(this.username, this.password);
    if (user) {
      if (user.tipo == 'profesor') {
        this.router.navigate(['dashboard']);
      } else if (user.tipo == 'alumno') {
        this.router.navigate(['qrscanner']);
      }
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