import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {User} from '../models/User';
import {FirestoreService} from './firestore.service';
import {Role, UserRole} from "../models/Role";
import {Project} from "../models/Project";
import {map} from "rxjs/operators";
import FieldValue = firebase.firestore.FieldValue;
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public projects$: Observable<Project[]>;
  public selectedProject: Project;

  constructor(private firestore: AngularFirestore, private db: FirestoreService, private authService: AuthService) {

  }

  public async getProject$(uid: string): Promise<Observable<Project>> {
    return this.db.docWithId$<Project>(`projects/${uid}`);
  }

  public async getProjects$(): Promise<Observable<Project[]>> {
    const userRef = await this.db.doc<DocumentReference>(`users/${this.authService.getUser.uid}`).ref;
    this.projects$ = await this.db.colWithIds$('projects', ref => ref.where('members', 'array-contains', userRef));
    return this.projects$;
  }

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
      roles: [{user: ownerRef, role: Role.Owner}],
      created_at: new Date()
    });


    return projectUid;
  }

  public async updateProject(project: Project): Promise<void>{
    await this.firestore.collection('projects').doc(project.id).update(project);
  }

  public projectIncludesUser(project: Project, userRef: DocumentReference) {
    for (let i of project.members)
    {
      if(i.id === userRef.id)
        return true;
    }
    return false;
  }

  public async addUserToProject(project: Project, userRef: DocumentReference) {
    await this.firestore.doc(`projects/${project.id}`).update({
      members: FieldValue.arrayUnion(userRef),
      roles: FieldValue.arrayUnion({role: Role.Member, user: userRef})
    })
  }

  async removeUserFromProject(userRole: UserRole, project: Project) {
    await this.firestore.doc(`projects/${project.id}`).update({
      members: FieldValue.arrayRemove(userRole.user),
      roles: FieldValue.arrayRemove({role: userRole.role, user: userRole.user})
    });
  }

  async makeUserOwner(user: UserRole, project: Project) {
    const currentOwner = await this.db.doc(`users/${this.authService.getUser.uid}`);

    await this.firestore.doc(`projects/${project.id}`).update({
      owner: user.user,
      roles: FieldValue.arrayRemove({role: Role.Owner, user: currentOwner.ref}, {role: Role.Member, user: user.user})
    });

    await this.firestore.doc(`projects/${project.id}`).update({
      roles: FieldValue.arrayUnion({role: Role.Member, user: currentOwner.ref}, {role: Role.Owner, user: user.user})
    });
  }
}
