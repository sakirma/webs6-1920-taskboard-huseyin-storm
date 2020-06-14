import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Story} from '../models/Story';
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import {error} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
  }

  public getStories$(projectID: string): Observable<Story[]>{
    // return this.firestore.collection('projects').doc(projectID).collection<Story>('stories').snapshotChanges(sn);
    return this.db.colWithIds$(`projects/${projectID}/stories`);
  }

  public getStoryDocs(storyIDs: DocumentReference[], sprintID): Observable<Story[]>{

    if (storyIDs.length < 1) { return; }
    return this.firestore.collection<Story>(storyIDs[0].parent, ref => ref.where('assigned_sprint', '==', sprintID)
    ).valueChanges({idField: 'id'});

    /*const stories: Story[] = [];
    for (const storyID of storyIDs){
      this.db.doc$<Story>(storyID.path).subscribe(story => {
        if (story === undefined) {return; }
        story.id = storyID.id;
        stories.push(story);
      });
    }
    return stories;*/
  }

  public getBackLogStories$(projectID: string): Observable<Story[]>{
    return this.firestore.collection('projects').doc(projectID)
      .collection<Story>('stories', ref => ref.where('isAssigned', '==', false)).valueChanges();
  }

  public async createStory(projectID: string, story: Story) {
    return await this.db.set<Story>(`projects/${projectID}/stories/${this.firestore.createId()}`, story);
  }

  public updateSprint(projectID: string, story: Story){
    return this.firestore.collection('projects').doc(projectID).collection('stories').doc(story.id).update(story);
  }

  async getStory$(projectId: string, storyId: string) {
      return this.db.doc$<Story>(`projects/${projectId}/stories/${storyId}`);
  }
}

