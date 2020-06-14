import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDialogComponent } from './add-user-dialog.component';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialog} from '@angular/material/dialog';

describe('AddUserDialogComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDialogComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        FormBuilder,
        MatDialog,
        MatSnackBar,
        Overlay,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(FormBuilder);
    TestBed.inject(AuthService);
    TestBed.inject(MatDialog);
    TestBed.inject(MatSnackBar);
    TestBed.inject(Overlay);

    fixture = TestBed.createComponent(AddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
