import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Project} from "../../../models/Project";
import {ProjectService} from "../../../services/project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StoryService} from "../../../services/story.service";
import {SprintService} from "../../../services/sprint.service";
import {AngularFirestoreDocument} from "@angular/fire/firestore";
import {Sprint} from "../../../models/Sprint";

@Component({
  selector: 'app-view-user-story',
  templateUrl: './view-user-story.component.html',
  styleUrls: ['./view-user-story.component.scss']
})
export class ViewUserStoryComponent implements OnInit, OnDestroy {

  private sprintId: string;
  private projectId: string;

  public project$: Observable<Project>;
  public sprint$: Observable<Sprint>;
  public sprintDoc: AngularFirestoreDocument<Sprint>;

  private projectSub: Subscription;
  private sprintSub: Subscription;

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
      if (!e.name)
      {
        this.redirectBack();
        return;
      }
    });

    this.sprintSub = this.sprint$.subscribe(e => {
      if (!e.name)
      {
        this.redirectBack();
        return;
      }
    })
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
    this.sprintSub.unsubscribe();
  }

  private async redirectBack() {
    await this.router.navigate(['/projects']);
    this.snackBar.open("given ID was undefined", 'Dismiss', {duration: 3000})
  }
}
