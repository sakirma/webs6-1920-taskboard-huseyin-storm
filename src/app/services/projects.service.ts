import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser} from '../interfaces/IUser';
import {map} from 'rxjs/operators';

export interface Project {
  uid: string;
  name: string;
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

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.projects$ = this.firestore.collection<Project>('projects', ref =>
      ref.where('members', 'array-contains', this.authService.getUser.uid)).valueChanges();
  }

  public getProjects$(): Observable<Project[]> {
    const users$ = this.firestore.collection<IUser>('users').valueChanges({idField: 'uid'});
    return combineLatest([users$, this.projects$]).pipe(map((results) => {
      results[1].forEach(project => {
        results[0].map(user => {
          if (user.uid === project.owner) {
            project.owner = user.name;
          }
          return user;
        });
      });
      return results[1];
    }));
  }

  public async createProject(projectInfo): Promise<void> {
    await this.firestore.collection<Project>('projects').doc(this.firestore.createId()).set({
      name: projectInfo.name,
      description: projectInfo.description,
      owner: projectInfo.owner,
      status: 'active',
      members: [projectInfo.owner],
      created_at: new Date()
    });
  }

}
