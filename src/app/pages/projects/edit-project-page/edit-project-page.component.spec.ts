import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPageComponent } from './edit-project-page.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';

describe('EditProjectPageComponent', () => {
  let component: EditProjectPageComponent;
  let fixture: ComponentFixture<EditProjectPageComponent>;
  let service: AngularFireModule;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectPageComponent ],
      providers: [ {provide: [AngularFireModule]}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AngularFireModule);
    fixture = TestBed.createComponent(EditProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
