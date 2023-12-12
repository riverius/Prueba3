import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    const mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve({ role: 'student' })),
      redirectUser: jasmine.createSpy('redirectUser').and.returnValue(Promise.resolve()),
      wrongCredentials: of()
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ LoginPage, HeaderComponentStub, MenuComponentStub ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});