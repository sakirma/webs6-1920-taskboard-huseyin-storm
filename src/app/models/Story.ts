import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

export enum UserStoryStatus {
  New = "New",
  InProgress = "In Progress",
  Done = "Done"
}

export class Story {
  id: string;
  name: string;
  description: string;
  board_position: UserStoryStatus;
  status: string;
  storyPoints: number;
  owner: DocumentReference;

  isArchived: boolean;

  isAssigned: boolean;
  assigned_to_sprint: DocumentReference;

  public constructor(name: string, description: string, boardPosition: UserStoryStatus, storyPoints: number, owner: DocumentReference) {
    this.name = name;
    this.description = description;
    this.board_position = boardPosition;
    this.status = boardPosition;
    this.storyPoints = storyPoints;
    this.owner = owner;
  }
}
