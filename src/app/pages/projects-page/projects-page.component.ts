import { Component, OnInit } from '@angular/core';
import {Project} from "../../services/projects.service";
import {AuthService} from "../../services/auth.service";
import {FirestoreService} from "../../services/firestore.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  public projects$ : Observable<Project[]>;

  constructor(public db: FirestoreService, private authService: AuthService) {
    authService.getUser.subscribe(user => {
    });

    this.projects$ = this.db.colWithIds$('projects');
  }

  ngOnInit(): void {
  }

}
