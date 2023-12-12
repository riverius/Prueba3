import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { FirebaseApp } from '@angular/fire/app';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseApp, useValue: {} }, 
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});