import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsOverviewComponent } from './sprints-overview.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';

describe('SprintsOverviewComponent', () => {
  let component: SprintsOverviewComponent;
  let fixture: ComponentFixture<SprintsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsOverviewComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        FormBuilder,
        MatSnackBar,
        Overlay,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(FormBuilder);
    TestBed.inject(AuthService);
    TestBed.inject(MatSnackBar);
    TestBed.inject(Overlay);

    fixture = TestBed.createComponent(SprintsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
