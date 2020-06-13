import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserStoryStatus} from "../../../models/UserStoryStatus";
import {ProjectService} from "../../../services/project.service";
import {Observable} from "rxjs";
import {Project} from "../../../models/Project";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-create-user-story',
  templateUrl: './create-user-story.component.html',
  styleUrls: ['./create-user-story.component.scss']
})
export class CreateUserStoryComponent implements OnInit {
  public userStoryForm: FormGroup;
  public status: Array<string> = [];

  public project$: Observable<Project>

  constructor(private fb: FormBuilder, private projectService: ProjectService, private route: ActivatedRoute) {
    this.userStoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [""],
      status: [null, Validators.required],
      storyPoints: [null, Validators.required ],
      owner: [""]
    });

    this.status = Object.values(UserStoryStatus);
  }



  async ngOnInit(): Promise<void> {
    const projectId = this.route.snapshot.params.uid;

    this.project$ = await this.projectService.getProject$(projectId);
  }

  createUserStory() {

  }

}
