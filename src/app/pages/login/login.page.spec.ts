import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginPage } from './login.page';
import { StateService } from '../../services/state.service';
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let stateService: jasmine.SpyObj<StateService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const stateServiceSpy = jasmine.createSpyObj('StateService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: StateService, useValue: stateServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on button click', () => {
    spyOn(component, 'login');
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    expect(component.login).toHaveBeenCalled();
  });

  it('should navigate to dashboard for professor', async(() => {
    const user = { tipo: 'profesor' };
    stateService.login.and.returnValue(Promise.resolve(user));

    component.username = 'test';
    component.password = 'password';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);

      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
      });
    });
  }));

  it('should navigate to qrscanner for student', async(() => {
    const user = { tipo: 'alumno' };
    stateService.login.and.returnValue(Promise.resolve(user));

    component.username = 'test';
    component.password = 'password';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);

      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['qrscanner']);
      });
    });
  }));
});
