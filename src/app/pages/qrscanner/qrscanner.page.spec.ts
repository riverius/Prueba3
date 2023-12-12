import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrscannerPage } from './qrscanner.page';
import { StateService } from 'src/app/services/state.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar AuthService
import { FirebaseApp } from '@angular/fire/app'; // Asegúrate de importar FirebaseApp
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';

describe('QrscannerPage', () => {
  let component: QrscannerPage;
  let fixture: ComponentFixture<QrscannerPage>;
  let stateService: StateService;
  let databaseService: DatabaseService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ QrscannerPage ],
      imports: [IonicModule],
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
        },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['someMethod']) },
        { provide: FirebaseApp, useValue: jasmine.createSpyObj('FirebaseApp', ['someMethod']) } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrscannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});