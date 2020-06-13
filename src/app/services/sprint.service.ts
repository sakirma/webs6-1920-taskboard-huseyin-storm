import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Sprint} from '../models/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
  }

  public getSprints$(projectID: string): Observable<any>{
    return this.firestore.collection('projects').doc(projectID).collection<Sprint>('sprints').valueChanges({idField: 'uid'});
  }

  public createSprint(projectID: string, sprint: Sprint){
    return this.firestore.collection('projects').doc(projectID).collection('sprints').add(sprint);
  }

  public updateSprint(projectID: string, sprint: Sprint){
    return this.firestore.collection('projects').doc(projectID).collection('sprints').doc(sprint.uid).update(sprint);
  }
}

