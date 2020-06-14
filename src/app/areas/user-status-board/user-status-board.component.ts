import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CdkDragDrop, CdkDragExit, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import {Observable, Subscription} from "rxjs";
import {Story, UserStoryStatus} from "../../models/Story";
import {StoryService} from "../../services/story.service";
import {first, take} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {Sprint} from "../../models/Sprint";

@Component({
  selector: 'app-user-status-board',
  templateUrl: './user-status-board.component.html',
  styleUrls: ['./user-status-board.component.scss']
})
export class UserStatusBoardComponent implements OnInit, OnDestroy {
  @Output() updateView = new EventEmitter();

  @Input() memberDoc: DocumentReference;
  @Input() sprintDoc: Observable<Sprint>;



  public newDocs: DocumentReference[] = [];
  public inProgressDocs: DocumentReference[] = [];
  public doneDocs: DocumentReference[] = [];

  private subscription: Subscription;


  constructor(private storyService: StoryService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {

    this.sprintDoc.pipe(take(1)).subscribe(async e => {
      for ( let userStoryDoc of e.user_stories )
      {
        let story$ = await this.storyService.getStoryWithDoc$(userStoryDoc);
        this.subscription = story$.subscribe(async story => {
          if(story.owner && story.owner.path === this.memberDoc.path && !story.isArchived)
          {
            switch (story.status) {
              case UserStoryStatus.New:
                if(!this.newDocs.includes(userStoryDoc))
                  this.newDocs.push(userStoryDoc);
                break;
              case UserStoryStatus.InProgress:
                if(!this.inProgressDocs.includes(userStoryDoc))
                  this.inProgressDocs.push(userStoryDoc);
                break;
              case UserStoryStatus.Done:
                if(!this.doneDocs.includes(userStoryDoc))
                  this.doneDocs.push(userStoryDoc);
                break;
            }
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async drop(event: CdkDragDrop<DocumentReference[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else if(event.isPointerOverContainer)
    {
      let data = event.previousContainer.data[event.previousIndex];

      // noinspection ES6MissingAwait
      this.storyService.addStoryToUser(this.memberDoc, data, status);
      event.previousContainer.data.splice(event.previousIndex);
    }
  }
}
