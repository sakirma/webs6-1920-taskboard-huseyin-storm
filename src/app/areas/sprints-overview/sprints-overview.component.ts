import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {Observable} from 'rxjs';
import {Sprint} from '../../models/Sprint';
import {ActivatedRoute, Router} from '@angular/router';
import {Story} from '../../models/Story';
import {StoryService} from '../../services/story.service';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DocumentReference} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/Project';

@Component({
  selector: 'app-sprints-overview',
  templateUrl: './sprints-overview.component.html',
  styleUrls: ['./sprints-overview.component.scss']
})
export class SprintsOverviewComponent implements OnInit {

  public sprints$: Observable<Sprint[]>;
  private backlog$: Observable<Story[]>;
  public project$: Observable<Project>;

  public backlog: Story[] = [];
  public sprints: Sprint[] = [];

  private projectID: string;

  public allDropLists = [ 'backLog' ];

  constructor(private sprintService: SprintService, private storyService: StoryService,
              private route: ActivatedRoute, private router: Router, private auth: AuthService, private projectService: ProjectService) {

    route.params.subscribe(async value => {
      this.projectID = value.uid;
      this.project$ = await projectService.getProject$(this.projectID);

      this.sprints$ = await sprintService.getSprints$(this.projectID);
      this.backlog$ = await storyService.getStories$(this.projectID);

      this.sprints$.subscribe( async sprints => {
        this.allDropLists.push(...sprints.map(sprint => sprint.uid));
        this.sprints = sprints;

        for (const sprint of this.sprints){
          sprint.stories_ref = await this.storyService.getStoryDocs(sprint.user_stories, sprint.uid);
        }
      });

      this.backlog$.subscribe(stories => {
        this.backlog = stories.filter(story =>  !story.isAssigned);
      });
    });
  }
  ngOnInit(): void {

  }

  public async onStoriesDrop($event: CdkDragDrop<Story[], any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {

      transferArrayItem($event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex);

      if ($event.previousContainer.id !== 'backLog' && $event.container.id !== 'backLog') {
        await this.sprintService.changeSprintUserStory(
          this.projectID,
          $event.previousContainer.id,
          $event.container.id,
          $event.container.data[$event.currentIndex].id);

      } else if ($event.previousContainer.id === 'backLog') {
        await this.sprintService.addUserStoryToSprint(this.projectID,
          $event.container.id,
          $event.container.data[$event.currentIndex].id);

      } else if ($event.container.id === 'backLog') {

        await this.sprintService.removeUserStoryFromSprint(this.projectID,
          $event.previousContainer.id,
          $event.container.data[$event.currentIndex].id);
      }
    }
  }

  public async onCreateSprint() {
    await this.router.navigate(['create-sprint', { uid: this.projectID}]);
  }

  async onCreateUserStory() {
    await this.router.navigate(['create-user-story', {uid: this.projectID}]);
  }

  public userIsOwner(project: Project): boolean {
    return project.owner.id === this.auth.getUser.uid;
  }
}
