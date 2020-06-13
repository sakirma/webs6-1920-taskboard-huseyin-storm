import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {User} from '../models/User';
import {FirestoreService} from './firestore.service';
import {Roles} from "../models/Roles";
import {Project} from "../models/Project";



@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public projects$: Observable<Project[]>;
  public selectedProject: Project;

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {

  }

  public async getProject$(uid: String): Promise<Observable<Project>> {
    return this.db.doc$(`projects/${uid}`);
  }

  public async getProjects$(): Promise<Observable<Project[]>> {
    const userRef = await this.db.doc<DocumentReference>(`users/${this.authService.getUser.uid}`).ref;
    this.projects$ = await this.db.colWithIds$('projects', ref => ref.where('members', 'array-contains', userRef));
    return this.projects$;
  }

  // public getProjects$(): Observable<Project[]> {
  //   const users$ = this.firestore.collection<User>('users').valueChanges({idField: 'uid'});
  //   return combineLatest([users$, this.projects$]).pipe(map((results) => {
  //     results[1].forEach(project => {
  //       results[0].map(user => {
  //         console.log(user.uid)
  //         console.log(project.owner)
  //         if (`users/${user.uid}` === project.owner) {
  //           project.owner =  user.name;
  //         }
  //         return user;
  //       });
  //     });
  //     return results[1];
  //   }));
  // }

  public getUsersFromProject$(uid: string): Observable<User[]> {
    return this.firestore.collection<User>('users', ref =>
      ref.where('projects', 'array-contains', uid)).valueChanges({idField: 'uid'});
  }

  public async createProject(projectInfo): Promise<string> {
    const projectUid = this.firestore.createId();
    const ownerRef = await this.db.doc(`users/${projectInfo.owner}`).ref;

    await this.firestore.collection<Project>('projects').doc(projectUid).set({
      name: projectInfo.name,
      description: projectInfo.description,
      owner: ownerRef,
      status: 'active',
      members: [ownerRef],
      roles: [{user: ownerRef, role: Roles.Owner}],
      created_at: new Date()
    });


    return projectUid;
  }

  public async updateProject(project: Project): Promise<void>{
    await this.firestore.collection('projects').doc(project.id).update(project);
  }

}
