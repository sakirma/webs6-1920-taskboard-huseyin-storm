import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPageComponent } from './edit-project-page.component';
import {AngularFireModule} from '@angular/fire';
import {AuthService} from '../../../services/auth.service';
import {imports} from '../../../app.module.imports';
import {Project} from '../../../models/Project';
import {of} from 'rxjs';
import {DocumentReference} from '@angular/fire/firestore';
import {UserRole} from '../../../models/Role';
import {ProjectService} from '../../../services/project.service';


export class FakeProject {
  public selectedProject = {
    created_at: new Date(),
    description: 'testDesc',
    id: 'testId',
    members: undefined,
    roles: undefined,
    owner: undefined,
    status: 'test',
    uid: 'testUid',
    name: 'test',
  };


}

describe('EditProjectPageComponent', () => {
  let component: EditProjectPageComponent;
  let fixture: ComponentFixture<EditProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectPageComponent ],
      imports,
      providers: [
        {provider: AuthService, useValue: {}},
        {provider: ProjectService, useClass: FakeProject}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have edit name', () => {
    expect(component.editedProject).toBeTruthy();
  });

  it('should contain project name', () => {
    expect(component.projectForm.controls.name.value).toBe('test');
  });

  it('should have valid form', () => {
    component.projectForm.get('name').setValue('Test');
    component.projectForm.get('description').setValue('TestDescription');
    expect(component.projectForm.valid).toBeTruthy();
  });
});
