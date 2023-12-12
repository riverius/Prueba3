import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { DashboardPage } from './dashboard.page';
import { ExtendedUser } from 'src/app/models/user';

describe('DashboardPage', () => {
  let authService: AuthService;
  let component: DashboardPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        DashboardPage,
        {
          provide: Firestore,
          useValue: {
            collection: () => ({
              doc: () => ({
                valueChanges: () => of({ foo: 'bar' }),
                set: () => Promise.resolve(),
              }),
            }),
          },
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    component = TestBed.inject(DashboardPage);
  });

  it('should call getCurrentUserData', async () => {
    const mockUser: Partial<ExtendedUser> = { 
      uid: '1', 
      displayName: 'Test User', 
      email: 'testuser@test.com', 
      first_name: 'Test',
      last_name: 'User',
      phone: '1234567890',
      address: 'Test Address',
      role: 'student',
      // Agrega aquí cualquier otra propiedad que necesites para tu prueba
    };
    spyOn(authService, 'getCurrentUserData').and.returnValue(Promise.resolve());

    await component.ngOnInit();

    expect(authService.getCurrentUserData).toHaveBeenCalled();
  });

});