import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage {
  constructor(public alertController: AlertController) {}
  imagePath: string = 'assets/qr_code_PNG25.png';



  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'fuap',
      buttons: ['OK'],
    });


    await alert.present();
  }
}