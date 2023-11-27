import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu.component';
import { StateService } from '../../services/state.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        StateService,
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
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});