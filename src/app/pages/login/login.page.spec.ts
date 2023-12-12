import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ExtendedUser } from 'src/app/models/user';

// Stubs for app-header and app-menu components
@Component({selector: 'app-header', template: ''})
class HeaderComponentStub {}

@Component({selector: 'app-menu', template: ''})
class MenuComponentStub {}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // use RouterTestingModule without routes
      declarations: [ LoginPage, HeaderComponentStub, MenuComponentStub ], // include the stubs here
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        // remove the provide for Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router); // inject the router directly
    navigateSpy = spyOn(router, 'navigate'); // set up a spy for the navigate method
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});