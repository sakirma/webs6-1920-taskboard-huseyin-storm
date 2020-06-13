import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../models/Project';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  public project$: Observable<Project>;


  constructor(private projectsService: ProjectService, private route: ActivatedRoute) {
    route.params.subscribe(async value => {
      const uid = value.uid;

      this.project$ = await projectsService.getProject$(uid);
    });
  }

  ngOnInit(): void {

  }
}
