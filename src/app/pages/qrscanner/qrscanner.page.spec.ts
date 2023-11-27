import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrscannerPage } from './qrscanner.page';
import { StateService } from 'src/app/services/state.service';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';

describe('QrscannerPage', () => {
  let component: QrscannerPage;
  let fixture: ComponentFixture<QrscannerPage>;
  let stateService: StateService;
  let databaseService: DatabaseService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ QrscannerPage ],
      providers: [
        {
          provide: StateService,
          useValue: {
            getCurrentUser: () => of({ id: '1', nombre: 'Test User' })
          }
        },
        {
          provide: DatabaseService,
          useValue: {
            setAttendance: () => Promise.resolve('Attendance registered')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QrscannerPage);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService);
    databaseService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});