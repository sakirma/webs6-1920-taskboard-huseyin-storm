import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {Observable} from 'rxjs';
import {Sprint} from '../../models/Sprint';
import {ActivatedRoute, Router} from '@angular/router';
import {Story} from '../../models/Story';
import {StoryService} from '../../services/story.service';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sprints-overview',
  templateUrl: './sprints-overview.component.html',
  styleUrls: ['./sprints-overview.component.scss']
})
export class SprintsOverviewComponent implements OnInit {

  public sprints$: Observable<Sprint[]>;
  public backlog$: Observable<Story[]>;
  public sprintList$: Observable<Story[]>;

  private projectID: string;

  constructor(private sprintService: SprintService, private storyService: StoryService,
              private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(async value => {
      this.projectID = value.uid;
      this.sprints$ = await sprintService.getSprints$(this.projectID);
      this.backlog$ = await storyService.getBackLogStories$(this.projectID);
    });
  }
  ngOnInit(): void {

  }

  public onStoriesDrop($event: CdkDragDrop<Story[], any>) {

  }

  public async onCreateSprint() {
    await this.router.navigate(['create-sprint', { uid: this.projectID}]);
  }
}
