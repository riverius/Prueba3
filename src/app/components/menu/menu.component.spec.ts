import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from './menu.component';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout', 'getUser', 'isLogedIn', 'getUserId', 'register', 'redirectUser', 'updateUserData', 'recoveryPassword']);
    authServiceSpy.wrongCredentials = of(null);

    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [IonicModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavController, useValue: NavController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});