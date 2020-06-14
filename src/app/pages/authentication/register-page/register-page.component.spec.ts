import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {imports} from '../../../app.module.imports';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ],
      imports,
      providers: [
        {provider: AuthService, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be an incomplete form', () => {

    component.registerForm.get('email').setValue('');
    component.registerForm.get('password').setValue('swagger');
    component.registerForm.get('confirmPassword').setValue('swagger');

    expect(component.registerForm.invalid).toBeTruthy();
  });
  it('should be a valid form', () => {

    component.registerForm.get('email').setValue('testEmail');
    component.registerForm.get('password').setValue('swagger');
    component.registerForm.get('confirmPassword').setValue('swagger');

    expect(component.registerForm.valid).toBeTruthy();
  });
  it('should be an invalid form with faulty password', () => {

    component.registerForm.get('email').setValue('testEmail');
    component.registerForm.get('password').setValue('swagger');
    component.registerForm.get('confirmPassword').setValue('dfdff');

    expect(component.registerForm.invalid).toBeTruthy();
  });

});
