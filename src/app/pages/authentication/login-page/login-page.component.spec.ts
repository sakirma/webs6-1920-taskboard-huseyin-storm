import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {imports} from '../../../app.module.imports';
import {User} from '../../../models/User';
import {DocumentReference} from '@angular/fire/firestore';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: imports,
      providers: [
        { provider: AuthService, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(AuthService);

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', () => {
    spyOn(component.authService, 'storeUser');
    spyOn(component.authService, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve());

    component.onLogin();
    expect(component.authService.signInWithEmailAndPassword).toHaveBeenCalled();
  });
});
