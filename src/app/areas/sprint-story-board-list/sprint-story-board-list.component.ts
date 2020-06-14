import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Sprint} from "../../models/Sprint";
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

@Component({
  selector: 'app-sprint-story-board-list',
  templateUrl: './sprint-story-board-list.component.html',
  styleUrls: ['./sprint-story-board-list.component.scss']
})
export class SprintStoryBoardListComponent implements OnInit {
  @Input() sprint$: Observable<Sprint>;

  constructor() {

  }

  ngOnInit(): void {
    if(!this.sprint$) {
      console.warn("No sprint is given!");
    }
  }

  drop(event: CdkDragDrop<DocumentReference[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
