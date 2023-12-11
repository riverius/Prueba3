import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, Barcode, IsGoogleBarcodeScannerModuleAvailableResult } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { StateService } from 'src/app/services/state.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {
  isSupported = false;
  barcode: Barcode | null = null
  nombre: string | undefined;

  constructor(private authService: AuthService, private toastController: ToastController, private alertController: AlertController, private stateService: StateService, private databaseService: DatabaseService) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const isAvailable: IsGoogleBarcodeScannerModuleAvailableResult = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    if (!isAvailable.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
    const { barcodes } = await BarcodeScanner.scan();
    const latestBarcode = barcodes[barcodes.length - 1];
    this.barcode = latestBarcode;

    const cursoId = this.barcode?.rawValue;
    const userId = await this.authService.getUserId();
    if (cursoId && userId) {
      try {
        const message = await this.databaseService.setAttendance(cursoId, userId);
        this.presentToast(message, 'success');
      } catch (error) {
        this.presentToast('Se produjo un error al registrar la asistencia', 'danger');
      }
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Conceda permiso de cámara para usar el escáner de código de barras.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color: color,
      position: 'middle',
      cssClass: 'font-size: 20px;'
    });
    toast.present();
  }

}