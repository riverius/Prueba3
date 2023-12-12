import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoveryPage } from './recovery.page';
import { AuthService } from '../../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';

describe('RecoveryPage', () => {
  let component: RecoveryPage;
  let fixture: ComponentFixture<RecoveryPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPage, FooterComponent, HeaderComponent ],
      imports: [IonicModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getCurrentUserData']) },
        { provide: FirebaseApp, useValue: jasmine.createSpyObj('FirebaseApp', ['someMethod']) },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});