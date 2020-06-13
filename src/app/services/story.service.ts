import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Story} from '../models/Story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
  }

  public getStories$(projectID: string): Observable<Story[]>{
    return this.firestore.collection('projects').doc(projectID).collection<Story>('stories').valueChanges({idField: 'uid'});
  }

  public getBackLogStories$(projectID: string): Observable<Story[]>{
    return this.firestore.collection('projects').doc(projectID)
      .collection<Story>('stories', ref => ref.where('isAssigned', '==', false)).valueChanges();
  }

  public createStory(projectID: string, story: Story){
    return this.firestore.collection('projects').doc(projectID).collection('stories').add(story);
  }

  public updateSprint(projectID: string, story: Story){
    return this.firestore.collection('projects').doc(projectID).collection('stories').doc(story.uid).update(story);
  }
}

