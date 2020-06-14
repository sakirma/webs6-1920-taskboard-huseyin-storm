import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPageComponent } from './projects-page.component';
import {imports} from '../../../app.module.imports';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/Project';
import {of} from 'rxjs';


export class FakeProjectService {
  public getProjects$() {
    const fakeProjects: Project[] = [
      {
        id: 'testID',
        uid: 'testUID',
        name: 'testName',
        description: 'description',
        members: [],
        roles: [],
        owner: null,
        created_at: null,
        status: 'active',
      },
      {
        id: 'testID',
        uid: 'testUID',
        name: 'testName',
        description: 'description',
        members: [],
        roles: [],
        owner: null,
        created_at: null,
        status: 'archived',
      }
    ];
    return of(fakeProjects);
  }
}

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsPageComponent ],
      imports,
      providers: [
        {provider: ProjectService, useValue: FakeProjectService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have projects', () => {
    expect(component.projects).toBeTruthy();
  });
  it('should have archived project', () => {
    expect(component.archivedProjects).toBeTruthy();
  });
});

