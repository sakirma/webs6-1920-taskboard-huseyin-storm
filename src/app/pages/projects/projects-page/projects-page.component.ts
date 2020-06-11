import { Component, OnInit } from '@angular/core';
import {Project, ProjectsService} from '../../../services/projects.service';
import {AuthService} from '../../../services/auth.service';
import {FirestoreService} from '../../../services/firestore.service';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
  public expandedElement: PeriodicElement | null;

  public projects: Project[] = [];

  constructor(public projectsService: ProjectsService, private authService: AuthService) {
    this.projectsService.getProjects$().subscribe(projects => {
      this.projects = projects;
    });
  }

  ngOnInit(): void {
  }


  openProject(id: string) {
    console.log(id);
  }
}
