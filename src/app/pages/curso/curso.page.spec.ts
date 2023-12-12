import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoPage } from './curso.page';
import { DatabaseService } from '../../services/database.service';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

describe('CursoPage', () => {
  let component: CursoPage;
  let fixture: ComponentFixture<CursoPage>;
  let databaseService: DatabaseService;
  let stateService: StateService;
  let router: Router;
  let navController: jasmine.SpyObj<NavController>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ CursoPage ],
      imports: [IonicModule],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            getCourses: () => of([{ id: '1', nombre: 'Test Course', asignatura: 'Test Subject' }])
          }
        },
        {
          provide: StateService,
          useValue: {
            setCurso: () => {}
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {}
          }
        },
        { provide: NavController, useValue: navController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoPage);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService);
    stateService = TestBed.inject(StateService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set courses on init', () => {
    spyOn(databaseService, 'getCourses').and.callThrough();
    component.ngOnInit();
    expect(component.cursos$).toEqual([{ id: '1', nombre: 'Test Course', asignatura: 'Test Subject' }]);
    expect(databaseService.getCourses).toHaveBeenCalled();
  });

});