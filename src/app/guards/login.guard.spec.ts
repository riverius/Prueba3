import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginGuard } from './login.guard';
import { StateService } from '../services/state.service';
import { of } from 'rxjs';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let stateService: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoginGuard,
        {
          provide: StateService,
          useValue: {
            isLoggedIn: of(true)
          }
        }
      ]
    });
    guard = TestBed.inject(LoginGuard);
    stateService = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  
});