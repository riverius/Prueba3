import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendancePage } from './attendance.page';
import { StateService } from 'src/app/services/state.service';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';

describe('AttendancePage', () => {
  let component: AttendancePage;
  let fixture: ComponentFixture<AttendancePage>;
  let stateService: StateService;
  let databaseService: DatabaseService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancePage ],
      providers: [
        {
          provide: StateService,
          useValue: {
            getCurso: () => of({ id: '1', nombre: 'Test Course', asignatura: 'Test Subject' })
          }
        },
        {
          provide: DatabaseService,
          useValue: {
            getUsersByCourseId: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AttendancePage);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService);
    databaseService = TestBed.inject(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set name and curse on init', () => {
    spyOn(stateService, 'getCurso').and.callThrough();
    component.ngOnInit();
    expect(component.nombre).toEqual('Test Course');
    expect(component.asignatura).toEqual('Test Subject');
    expect(stateService.getCurso).toHaveBeenCalled();
  });

});