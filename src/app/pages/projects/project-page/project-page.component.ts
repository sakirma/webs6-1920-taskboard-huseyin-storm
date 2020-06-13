import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Project, ProjectsService} from '../../../services/projects.service';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from '../../../services/firestore.service';
import {User} from '../../../interfaces/User';
import {DocumentReference} from '@angular/fire/firestore';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  public users$: Array<Observable<User>> = [];
  public project$: Observable<Project>;

  public columnsToDisplay = ['members'];

  constructor(private projectsService: ProjectsService, private db: FirestoreService, private route: ActivatedRoute) {
    route.params.subscribe(value => {
      const uid = value.uid;

      this.project$ = this.db.doc$(`projects/${uid}`);
    });

  }

  ngOnInit(): void {

  }

  public addUserToProject(): void {
    // let dialog =
  }
}
