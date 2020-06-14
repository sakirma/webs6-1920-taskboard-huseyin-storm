import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateProjectPageComponent} from './create-project-page.component';
import {AuthService} from '../../../services/auth.service';
import {imports} from '../../../app.module.imports';

describe('CreateProjectPageComponent', () => {
  let component: CreateProjectPageComponent;
  let fixture: ComponentFixture<CreateProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectPageComponent ],
      imports,
      providers: [{ provider: AuthService, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CreateProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be a valid form', () => {
    component.createProject();

    component.projectForm.get('name').setValue('testName');
    component.projectForm.get('description').setValue('testDescription');

    expect(component.projectForm.valid).toBeTruthy();
  });
  it('should be an invalid form', () => {
    component.createProject();

    component.projectForm.get('name').setValue('');
    component.projectForm.get('description').setValue('testDescription');

    expect(component.projectForm.invalid).toBeTruthy();
  });
  it('should be an valid form without description', () => {
    component.createProject();

    component.projectForm.get('name').setValue('testName');
    component.projectForm.get('description').setValue('');

    expect(component.projectForm.get('name').value).toBe('testName');
    expect(component.projectForm.get('description').value).toBe('');

    expect(component.projectForm.valid).toBeTruthy();
  });
});
