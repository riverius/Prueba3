import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, Barcode, IsGoogleBarcodeScannerModuleAvailableResult } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController) {}

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
    this.barcodes.push(...barcodes);
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

}