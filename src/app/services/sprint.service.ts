import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Sprint} from '../models/Sprint';
import {Story} from '../models/Story';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
  }

  public getSprints$(projectID: string): Observable<any>{
    return this.firestore.collection('projects').doc(projectID).collection<Sprint>('sprints').valueChanges({idField: 'uid'});
  }
  public createSprint(projectID: string, sprint){
    return this.firestore.collection('projects').doc(projectID).collection('sprints').add(sprint);
  }

  public updateSprint(projectID: string, sprint){
    return this.firestore.collection('projects').doc(projectID).collection('sprints').doc(sprint.uid).update(sprint);
  }

  public async addUserStoryToSprint(projectID: string, sprintID: string, storyID: string){
    await this.firestore.collection('projects').doc(projectID).collection('stories').doc<Story>(storyID).update({isAssigned: true});
    const story = await this.db.doc<Story>(`projects/${projectID}/stories/${storyID}`);
    
    await this.firestore
      .collection('projects').doc(projectID)
      .collection('sprints')
      .doc<Sprint>(sprintID)
      .update({user_stories: [story.ref]});
  }
}

