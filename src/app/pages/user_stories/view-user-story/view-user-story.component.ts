import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Project} from "../../../models/Project";
import {ProjectService} from "../../../services/project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StoryService} from "../../../services/story.service";
import {SprintService} from "../../../services/sprint.service";
import {AngularFirestoreDocument} from "@angular/fire/firestore";
import {Sprint} from "../../../models/Sprint";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import {UserStoryStatus} from "../../../models/Story";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-view-user-story',
  templateUrl: './view-user-story.component.html',
  styleUrls: ['./view-user-story.component.scss']
})
export class ViewUserStoryComponent implements OnInit, OnDestroy {

  public projectId: string;
  public project$: Observable<Project>;
  public sprint$: Observable<Sprint>;
  public sprintDoc: AngularFirestoreDocument<Sprint>;
  public backlogStories: DocumentReference[] = [];
  public sprint: Sprint;
  public reloadEmitter: EventEmitter<void> = new EventEmitter<void>();
  private sprintId: string;
  private projectSub: Subscription;
  private sprintSub: Subscription;
  private subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router,
              private snackBar: MatSnackBar,
              private storyService: StoryService,
              private sprintService: SprintService) {

  }

  async ngOnInit() {
    this.sprintId = this.activatedRoute.snapshot.params.sUid;
    this.projectId = this.activatedRoute.snapshot.params.pUid;

    this.sprintDoc = await this.sprintService.getSprintDoc(this.projectId, this.sprintId);

    this.project$ = await this.projectService.getProject$(this.projectId);
    this.sprint$ = await this.sprintService.getSprint$(this.sprintDoc);

    if (!this.projectId || !this.sprintId) {
      await this.redirectBack();
    }

    this.projectSub = this.project$.subscribe(e => {
      if (!e.name) {
        this.redirectBack();
        return;
      }
    });

    this.sprintSub = this.sprint$.subscribe(async e => {
      if (!e.name) {
        await this.redirectBack();
        return;
      }

      this.sprint = e;
      for (let userStoryDoc of e.user_stories) {
        let story$ = await this.storyService.getStoryWithDoc$(userStoryDoc);
        this.subscription = story$.subscribe(async story => {
          const uIndex = this.sprint.user_stories.indexOf(userStoryDoc, 0);
          if (!story.isAssigned && uIndex > -1) {
            this.sprint.user_stories.splice(uIndex, 1);
          }

          if (!story.owner && !story.isArchived && story.isAssigned) {
            if (!this.backlogStories.includes(userStoryDoc)) {
              this.backlogStories.push(userStoryDoc);
            }

            if(!this.sprint.user_stories.includes(userStoryDoc))
            {
              this.sprint.user_stories.push(userStoryDoc);
            }
          }

          this.reloadEmitter.emit();
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.sprintSub.unsubscribe();
    this.subscription.unsubscribe();
  }

  public drop(event: CdkDragDrop<DocumentReference[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.isPointerOverContainer) {
      let data = event.previousContainer.data[event.previousIndex];
      this.storyService.addStoryToBacklog(data);
      event.previousContainer.data.splice(event.previousIndex);
    }
  }

  private async redirectBack() {
    await this.router.navigate(['/projects']);
    this.snackBar.open("given ID was undefined", 'Dismiss', {duration: 3000})
  }
}
