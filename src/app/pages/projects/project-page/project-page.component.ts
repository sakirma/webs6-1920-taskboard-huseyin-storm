import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../interfaces/User';
import {Project, ProjectsService} from '../../../services/projects.service';
import {ActivatedRoute} from '@angular/router';
import {FirestoreService} from "../../../services/firestore.service";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  // TODO: User naar een subcollectie verplaatsen

  public users$: Observable<User[]>;
  public project$: Observable<Project>;

  public columnsToDisplay = ['name'];

  constructor(private projectsService: ProjectsService, private db: FirestoreService, private route: ActivatedRoute) {



    route.params.subscribe(value => {
      const uid = value.uid;

      this.db.doc$(`projects/${uid}`).subscribe(e => {
        console.log(e);
      })

      this.project$ = this.projectsService.getProject$(uid);

      this.users$ = this.projectsService.getUsersFromProject$(uid);
    });


  }

  ngOnInit(): void {

  }

  public addUserToProject(): void {
    //let dialog =
  }
}
