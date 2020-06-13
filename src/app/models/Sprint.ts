import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

export interface Sprint {
  uid: string;
  name: string;
  active: boolean;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  user_stories: DocumentReference[];
}
