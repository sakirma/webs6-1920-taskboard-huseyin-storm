import {Component, OnDestroy, OnInit} from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {Observable, Subscription} from 'rxjs';
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
export class SprintsOverviewComponent implements OnInit, OnDestroy {

  public sprints$: Observable<Sprint[]>;
  public project$: Observable<Project>;

  private backLogSub: Subscription;
  private sprintSub: Subscription;

  public backlog: Story[] = [];
  public sprints: Sprint[] = [];

  public projectID: string;

  public allDropLists = [ 'backLog' ];
  public archivedColumnsToDisplay = ['name', 'unarchive'];

  public archivedSprints: Sprint[] = [];


  constructor(private sprintService: SprintService, private storyService: StoryService,
              private route: ActivatedRoute, private router: Router, private auth: AuthService, private projectService: ProjectService) {

    route.params.subscribe(async value => {
      this.projectID = value.uid;
      this.project$ = await projectService.getProject$(this.projectID);

      this.sprints$ = await sprintService.getSprints$(this.projectID);
      const backlog = await storyService.getStories$(this.projectID);

      this.sprintSub = this.sprints$.subscribe( async sprints => {
        this.allDropLists.push(...sprints.map(sprint => sprint.uid));

        this.archivedSprints = [];
        this.sprints = [];
        for (const sprint of sprints){
          if(sprint.active)
          {
            this.sprints.push(sprint);
            sprint.stories_ref = await this.storyService.getStoryDocs(sprint.user_stories, sprint.uid);
          }
          else {
            this.archivedSprints.push(sprint);
          }
        }
      });
      this.backLogSub = backlog.subscribe(stories => {
        this.backlog = stories.filter(story =>  !story.isAssigned);
      });


    });
  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.sprintSub.unsubscribe();
    this.backLogSub.unsubscribe();
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

  public async openSprintPage(uid: string) {
    await this.router.navigate(['view-sprint', {pUid: this.projectID, sUid: uid}]);
  }

  public async editStory(uid: string) {
    await this.router.navigate(['edit-story', {pUid: this.projectID, stUid: uid}]);
  }

  public async toggleArchive(projectId: string, sprint: Sprint) {
    sprint.active = true;
    await this.sprintService.updateSprint(projectId, sprint);
  }

}

