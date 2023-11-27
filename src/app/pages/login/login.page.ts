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

  login() {
    if (this.stateService.login(this.username, this.password)) {
      const typeUser = this.stateService.getTypeUser().subscribe(typeUser => this.typeUser = typeUser)
      if (this.typeUser == 'teacher') {
        this.router.navigate(['dashboard']);
      } else if (this.typeUser == 'student') {
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