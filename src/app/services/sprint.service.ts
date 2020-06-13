import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from './firestore.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
  }

  private getSprints$(projectID: string): Observable<any>{
    return this.firestore.collection('projects').doc(projectID).collection<Sprint>('sprints').valueChanges({idField: 'uid'});
  }
}

