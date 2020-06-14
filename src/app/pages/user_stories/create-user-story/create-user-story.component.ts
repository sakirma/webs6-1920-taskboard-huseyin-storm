import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../services/project.service";
import {Observable} from "rxjs";
import {Project} from "../../../models/Project";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Story, UserStoryStatus} from "../../../models/Story";
import {StoryService} from "../../../services/story.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-create-user-story',
  templateUrl: './create-user-story.component.html',
  styleUrls: ['./create-user-story.component.scss']
})
export class CreateUserStoryComponent implements OnInit {
  public userStoryForm: FormGroup;
  public status: Array<string> = [];

  public project$: Observable<Project>
  private projectId: string;

  constructor(private fb: FormBuilder, private userService: UserService, private projectService: ProjectService, private storyService: StoryService, private router: Router, private route: ActivatedRoute) {
    this.userStoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [""],
      status: [null, Validators.required],
      storyPoints: [null, Validators.required],
      owner: [""]
    });

    this.status = Object.values(UserStoryStatus);
  }


  async ngOnInit(): Promise<void> {
    this.projectId = this.route.snapshot.params.uid;
    this.project$ = await this.projectService.getProject$(this.projectId);
  }

  public async createUserStory() {
    let story = new Story(
      this.userStoryForm.get("name").value,
      this.userStoryForm.get("description").value,
      UserStoryStatus[this.userStoryForm.get("status").value.replace(/\s/g, "")],
      this.userStoryForm.get("storyPoints").value,
      await this.userService.getUserDocRef(this.userStoryForm.get("owner").value),
    );

    await this.storyService.createStory(this.projectId, story);
    await this.router.navigate(['project', {uid: this.projectId}]);
  }
}
