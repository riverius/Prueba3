import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar AuthService
import { FirebaseApp } from '@angular/fire/app'; // Asegúrate de importar FirebaseApp

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['someMethod']) }, // Proporciona un valor ficticio para AuthService
        { provide: FirebaseApp, useValue: jasmine.createSpyObj('FirebaseApp', ['someMethod']) } // Proporciona un valor ficticio para FirebaseApp
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});