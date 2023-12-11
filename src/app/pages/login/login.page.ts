import { Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ExtendedUser } from '../../models/user';

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
  loginForm!: FormGroup;
  wrongCredentialsSubscription!: Subscription;
  title: string = 'Ingresar al Portal Academico';
  username: string = '';
  password: string = '';
  typeUser: string = '';
  rememberMe: boolean = false;
  private lastBackButtonPress: number = 0;

  constructor(private authService:AuthService,
    private formBuilder: FormBuilder,
    private router:Router,
    private platform: Platform,
    private toastController: ToastController,
    private location: Location,
    private loadingController: LoadingController,
    public deviceService: DeviceService) { 
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url === '/login') {
        const now = new Date().getTime();
        if (now - this.lastBackButtonPress < 2000) {
          navigator['app'].exitApp();
        } else {
          this.lastBackButtonPress = now;
          this.presentToast("Presione nuevamente para salir");
        }
      } else {
        this.location.back();
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    this.wrongCredentialsSubscription = this.authService.wrongCredentials.subscribe(() => {
      this.presentToast('Las credenciales son incorrectas');
    });
  }

  ngOnDestroy() {
    if (this.wrongCredentialsSubscription) {
      this.wrongCredentialsSubscription.unsubscribe();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
      });
      await loading.present();

      try {
        const user = await this.authService.login(email, password, rememberMe);
        if (user) {
          const extendedUser = user as ExtendedUser;
          this.authService.redirectUser(extendedUser.role);
        }
      } catch (error) {
        console.error(error);
      } finally {
        await loading.dismiss();
      }
    }
  }

  forgotPassword() {
    this.router.navigateByUrl('forgot-password');
  }
 
}