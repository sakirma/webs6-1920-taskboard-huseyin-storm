import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../interfaces/User';
import {map} from 'rxjs/operators';
import {FirestoreService} from "./firestore.service";

export interface Project {
  uid: string;
  name: string;
  description: string;
  members: string[];
  owner: string;
  created_at: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly projects$: Observable<Project[]>;
  public selectedProject: Project;

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {
    this.projects$ = this.firestore.collection<Project>('projects', ref =>
      ref.where('members', 'array-contains', this.authService.getUser.uid)).valueChanges({idField: 'uid'});
  }

  public getProject$(uid: string): Observable<Project>{
    return this.firestore.collection('project').doc<Project>(uid).valueChanges();
  }

  public getProjects$(): Observable<Project[]> {
    const users$ = this.firestore.collection<User>('users').valueChanges({idField: 'uid'});
    return combineLatest([users$, this.projects$]).pipe(map((results) => {
      results[1].forEach(project => {
        results[0].map(user => {
          if (user.uid === project.owner) {
            project.owner =  user.name;
          }
          return user;
        });
      });
      return results[1];
    }));
  }

  public getUsersFromProject$(uid: string): Observable<User[]> {
    return this.firestore.collection<User>('users', ref =>
      ref.where('projects', 'array-contains', uid)).valueChanges({idField: 'uid'});
  }

  public async createProject(projectInfo): Promise<string> {
    const projectUid = this.firestore.createId();
    await this.firestore.collection<Project>('projects').doc(projectUid).set({
      name: projectInfo.name,
      description: projectInfo.description,
      owner: this.firestore.doc(`users/${projectInfo.owner}`).ref,
      status: 'active',
      members: [projectInfo.owner],
      created_at: new Date()
    });

    return projectUid;
  }

  public async updateProject(project: Project): Promise<void>{
    await this.firestore.collection('projects').doc(project.uid).update(project);
  }

}
