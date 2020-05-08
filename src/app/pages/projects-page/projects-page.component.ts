import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {AuthService} from "../../services/auth.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {

  constructor(private projectsService: ProjectsService, private authService: AuthService) {
    authService.getUser.subscribe(user => {
      console.log(user);
    });
  }

  ngOnInit(): void {
  }

}
