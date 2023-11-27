import { TestBed } from '@angular/core/testing';
import { StateService } from '../../services/state.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let stateService: StateService;
  let component: DashboardPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
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
    stateService = TestBed.inject(StateService);
    component = TestBed.inject(DashboardPage);
  });

  it('should set username on init', () => {
    const mockUser = { id: '1', nombre: 'Test User', username: 'testuser', password: 'testpassword', tipo: 'testtype' };
    spyOn(stateService, 'getCurrentUser').and.returnValue(of(mockUser));
    component.ngOnInit();
    expect(component.username).toEqual('Test User');
    expect(stateService.getCurrentUser).toHaveBeenCalled();
  });

});