import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSprintComponent } from './edit-sprint.component';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {Observable, of} from 'rxjs';
import {Sprint} from '../../../models/Sprint';
import {SprintService} from '../../../services/sprint.service';


export class FakeSprintService{
  private fakeSprintArray: Sprint[] = [{
    active: false,
    created_at: null,
    end_date: null,
    name: 'testSprint',
    start_date: null,
    user_stories: [],
    stories_ref: of([]),
    uid: 'testID'
  }];

  public getSprints$(projectID: string): Observable<Sprint[]> {
    return of(this.fakeSprintArray);
  }
}

describe('EditSprintComponent', () => {
  let component: EditSprintComponent;
  let fixture: ComponentFixture<EditSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSprintComponent ],
      providers: [
        { provider: SprintService, userValue: FakeSprintService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(FormBuilder);
    TestBed.inject(AuthService);
    TestBed.inject(MatSnackBar);
    TestBed.inject(Overlay);

    fixture = TestBed.createComponent(EditSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
