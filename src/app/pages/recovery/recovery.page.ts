import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {
  title: string = 'Recuperar contraseña';
  email: string = ''
  constructor(private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  recovery(){
    if(this.email !== ''){
      this.authService.recoveryPassword(this.email);
      this.toastController.create({
        message: 'Se ha enviado un correo a su cuenta',
        color: 'success',
        duration: 2000
      }).then((toast) => {
        toast.present();
      });
    }else{
      this.toastController.create({
        message: 'Debe ingresar un correo',
        color: 'danger',
        duration: 2000
      }).then((toast) => {
        toast.present();
      });
    }
  }

}
