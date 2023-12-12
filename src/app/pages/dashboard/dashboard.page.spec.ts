import { TestBed } from '@angular/core/testing';
import { DashboardPage } from './dashboard.page';
import { AuthService } from '../../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardPage,
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUserData']) },
        { provide: FirebaseApp, useValue: jasmine.createSpyObj('FirebaseApp', ['someMethod']) } 
      ]
    });
    authService = TestBed.inject(AuthService);
    component = TestBed.inject(DashboardPage);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});