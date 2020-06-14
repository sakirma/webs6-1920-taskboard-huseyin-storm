import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {Observable} from 'rxjs';
import {Sprint} from '../models/Sprint';
import {Story} from '../models/Story';
import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService) {
  }

  public getSprints$(projectID: string): Observable<any> {
    return this.firestore.collection('projects').doc(projectID).collection<Sprint>('sprints').valueChanges({idField: 'uid'}).pipe();
  }

  public createSprint(projectID: string, sprint) {
    return this.firestore.collection('projects').doc(projectID).collection('sprints').add(sprint);
  }

  public updateSprint(projectID: string, sprint) {
    return this.firestore.collection('projects').doc(projectID).collection('sprints').doc(sprint.uid).update(sprint);
  }

  public async changeSprintUserStory(projectID: string, prevSprintID: string, sprintID: string, storyID: string) {

    const story = await this.db.doc<Story>(`projects/${projectID}/stories/${storyID}`);

    await this.firestore
      .collection('projects')
      .doc(projectID)
      .collection('sprints')
      .doc<any>(prevSprintID)
      .update({user_stories: FieldValue.arrayRemove(story.ref)});

    await this.firestore
      .collection('projects').doc(projectID)
      .collection('sprints')
      .doc<any>(sprintID)
      .update({user_stories: FieldValue.arrayUnion(story.ref)});

    await this.firestore.doc(story.ref.path).update({assigned_sprint: sprintID});
  }

  public async removeUserStoryFromSprint(projectID: string, sprintID: string, storyID: string) {
    const story = await this.db.doc<Story>(`projects/${projectID}/stories/${storyID}`);

    await this.firestore
      .collection('projects')
      .doc(projectID)
      .collection('sprints')
      .doc<any>(sprintID)
      .update({user_stories: FieldValue.arrayRemove(story.ref)});

    await this.firestore.doc(story.ref.path).update({isAssigned: false, assigned_sprint: null});
  }

  public async addUserStoryToSprint(projectID: string, sprintID: string, storyID: string) {
    const story = await this.db.doc<Story>(`projects/${projectID}/stories/${storyID}`);
    await this.firestore.doc(story.ref.path).update({isAssigned: true, assigned_sprint: sprintID});

    await this.firestore
      .collection('projects').doc(projectID)
      .collection('sprints')
      .doc(sprintID)
      .update({user_stories: FieldValue.arrayUnion(story.ref)});

  }

  public async getSprintDoc(projectId: string, sprintId: string) {
    return this.db.doc<Sprint>(`projects/${projectId}/sprints/${sprintId}`);
  }

  public async getSprint$(doc: AngularFirestoreDocument<Sprint>) {
    return this.db.docWithId$(doc);
  }

  public getBurnDown(projectId: string, sprintId: string, startDate: Date, endDate: Date) {
    return new Promise<any>((resolve, reject) => {

      const sub = this.firestore.collection<Story>(`/projects/${projectId}/stories`, ref => ref.where('assigned_sprint', '==', sprintId)).valueChanges().subscribe((userstories) => {
        // this gives an object with dates as keys


        const grouped: Array<{ date: string, open: number, optimal: number }> = [];

        let day = 0;
        let storiesPerDay = userstories.length / (Math.floor(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        for (const d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          grouped.push({
            date: d.toLocaleDateString(),
            open: userstories.length - userstories.filter(x => {
              const date = x.updatedAt.toDate();
              return x.status === 'Done' && (date.getDate() <= d.getDate() || date.getMonth() < d.getMonth())
            }).length,
            optimal: Math.ceil(userstories.length - (storiesPerDay * day++))
          });
        }

        sub.unsubscribe();
        resolve(grouped);
      });
    });
  }
}

