import { Component, OnInit } from '@angular/core';
import {Project, ProjectsService} from '../../../services/projects.service';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {FirestoreService} from "../../../services/firestore.service";



export interface PeriodicElement {
  description: string;
}

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsPageComponent implements OnInit {
  public columnsToDisplay = ['name', 'status', 'owner'];
  public archivedColumnsToDisplay = ['name', 'status', 'owner', 'unarchive'];

  public expandedElement: PeriodicElement | null;

  public projects: Project[] = [];
  public archivedProjects: Project[] = [];

  public projects$: Observable<Project[]>;

  constructor(public projectsService: ProjectsService, private router: Router, private db: FirestoreService) {
    this.projects$ = this.projectsService.getProjects$();
    this.projects$.subscribe(projects => {
      this.archivedProjects = projects.filter(e => e.status === 'archived');
      this.projects = projects.filter(e => e.status === 'active');
    });
  }

  ngOnInit(): void {
  }

  public async toggleArchive(selectedProject: Project){
    selectedProject.status = selectedProject.status === 'archived' ? 'active' : 'archived';
    await this.projectsService.updateProject(selectedProject);
  }

  public async navigateTo(selectedProject: Project, route: string) {
    this.projectsService.selectedProject = selectedProject;
    await this.router.navigate([route, {uid: selectedProject.uid}]);
  }
}
