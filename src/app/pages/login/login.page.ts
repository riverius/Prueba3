import { Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { DeviceService } from '../../services/device.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare global {
  interface Navigator {
    app: any;
  }
}
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
  private lastBackButtonPress: number = 0;

  constructor(private stateService:StateService, private router:Router, private platform: Platform, private toastController: ToastController, private location: Location, public deviceService: DeviceService) { 
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url === '/login') {
        const now = new Date().getTime();
        if (now - this.lastBackButtonPress < 2000) {
          navigator['app'].exitApp();
        } else {
          this.lastBackButtonPress = now;
          this.presentToast();
        }
      } else {
        this.location.back();
      }
    });
  }

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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Presiona nuevamente para salir',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}