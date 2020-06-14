import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Project} from '../../../models/Project';
import {UserService} from '../../../services/user.service';
import {ProjectService} from '../../../services/project.service';
import {StoryService} from '../../../services/story.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Story, UserStoryStatus} from '../../../models/Story';
import {first} from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-stories',
  templateUrl: './edit-stories.component.html',
  styleUrls: ['./edit-stories.component.scss']
})
export class EditStoriesComponent implements OnInit {

  public userStoryForm: FormGroup;
  public status: Array<string> = [];

  public project$: Observable<Project>;
  public projectId: string;
  public storyId: string;
  private storyDoc: DocumentReference;

  constructor(private fb: FormBuilder, private userService: UserService, private projectService: ProjectService, private storyService: StoryService, private router: Router, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params.pUid;
    this.storyId = this.route.snapshot.params.stUid;

    this.status = Object.values(UserStoryStatus);
  }


  async ngOnInit(): Promise<void> {
    this.project$ = await this.projectService.getProject$(this.projectId);
    const story$ = await this.storyService.getStory$(this.projectId, this.storyId);
    this.storyDoc = await this.storyService.getStoryDoc(this.projectId, this.storyId);
    const story = await story$.pipe(first()).toPromise();


    this.userStoryForm = this.fb.group({
      name: [story.name, Validators.required],
      description: [story.description],
      status: [story.status, Validators.required],
      storyPoints: [story.storyPoints, Validators.required],
      owner: [story.owner?.path]
    });
  }

  public async updateStory() {
    const story = new Story(
      this.userStoryForm.get('name').value,
      this.userStoryForm.get('description').value,
      UserStoryStatus[this.userStoryForm.get('status').value.replace(/\s/g, '')],
      this.userStoryForm.get('storyPoints').value,
      await this.userService.getUserDocRef(this.userStoryForm.get('owner').value),
    );

    await this.storyService.updateStory(this.storyDoc, story);
    await this.router.navigate(['project', {uid: this.projectId}]);
  }
}
