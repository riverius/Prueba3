import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

// Stubs for app-header and app-menu components
@Component({selector: 'app-header', template: ''})
class HeaderComponentStub {}

@Component({selector: 'app-menu', template: ''})
class MenuComponentStub {}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let stateService: jasmine.SpyObj<StateService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async() => {
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['login']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // use RouterTestingModule without routes
      declarations: [ LoginPage, HeaderComponentStub, MenuComponentStub ], // include the stubs here
      providers: [
        { provide: StateService, useValue: stateServiceSpy },
        // remove the provide for Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    router = TestBed.inject(Router); // inject the router directly
    navigateSpy = spyOn(router, 'navigate'); // set up a spy for the navigate method
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when user is a professor', async () => {
    const mockUser = { id: '1', nombre: 'Test User', username: 'testuser', password: 'testpassword', tipo: 'profesor' };
    stateService.login.and.returnValue(Promise.resolve(mockUser));

    await component.login();

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should navigate to qrscanner when user is a student', async () => {
    const mockUser = { id: '1', nombre: 'Test User', username: 'testuser', password: 'testpassword', tipo: 'alumno' };
    stateService.login.and.returnValue(Promise.resolve(mockUser));

    await component.login();

    expect(router.navigate).toHaveBeenCalledWith(['qrscanner']);
  });

  it('should alert when login fails', async () => {
    stateService.login.and.returnValue(Promise.resolve(null));
    spyOn(window, 'alert');

    await component.login();

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });
  
});