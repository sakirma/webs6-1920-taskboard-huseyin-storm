import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

export interface Story {
  id: string;
  name: string;
  description: string;
  board_position: string;
  isAssigned: boolean;
  assigned_to_sprint: DocumentReference;
  assigned_to_user: DocumentReference;
  created_at: Date;
}
