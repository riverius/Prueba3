import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private loadingController: LoadingController, private toastController: ToastController) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    try {
      const success = await this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.first_name,
        this.registerForm.value.last_name,
        this.registerForm.value.phone,
        this.registerForm.value.address,
        this.registerForm.value.role
      );
      if (success) {
          const toast = await this.toastController.create({
            message: 'Registro exitoso.',
            duration: 2000,
            color: 'success',
            position: 'middle',
          });
          toast.present();
      } else {
          const toast = await this.toastController.create({
            message: 'Registro fallido.',
            duration: 2000,
            color: 'danger',
            position: 'middle'
          });
          toast.present();
      }
    } catch (error) {
      console.error(error);
    } finally {
      await loading.dismiss();
    }
  }
}