import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import {Story} from './Story';
import {Observable} from 'rxjs';

export interface Sprint {
  uid: string;
  name: string;
  active: boolean;
  start_date: Timestamp;
  end_date: Timestamp;
  created_at: Timestamp;
  user_stories: DocumentReference[];
  stories_ref: Story[];
}
