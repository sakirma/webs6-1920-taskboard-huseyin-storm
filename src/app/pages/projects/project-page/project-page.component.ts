import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectsService} from '../../../services/projects.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from "../../../models/Project";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  public project$: Observable<Project>;


  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {
    route.params.subscribe(async value => {
      const uid = value.uid;

      this.project$ = await projectsService.getProject$(uid);
    });
  }

  ngOnInit(): void {

  }
}
