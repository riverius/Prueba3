import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPage, FooterComponent ],
      imports: [IonicModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['someMethod']) },
        { provide: FirebaseApp, useValue: jasmine.createSpyObj('FirebaseApp', ['someMethod']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});