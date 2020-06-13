import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {Observable} from 'rxjs';
import {Sprint} from '../../models/Sprint';
import {ActivatedRoute} from '@angular/router';
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

  constructor(private sprintService: SprintService, private storyService: StoryService, private route: ActivatedRoute) {
    route.params.subscribe(async value => {
      const uid = value.uid;
      this.sprints$ = await sprintService.getSprints$(uid);
      this.backlog$ = await storyService.getBackLogStories$(uid);
    });
  }
  ngOnInit(): void {

  }

  public onStoriesDrop($event: CdkDragDrop<Story[], any>) {

  }
}
