import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../interfaces/User';
import {auth} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {Project} from './projects.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.fireAuth.authState.subscribe(this.onAuthStateChange.bind(this));
  }

  private onAuthStateChange(user: User) {
    if (user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
      return;
    }
    localStorage.setItem('user', null);
  }

  public signInWithPopup() {
    this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      // TODO: redirect to projects page
    );
  }

  public get isLoggedIn(): boolean{
    const user = localStorage.getItem('user');
    return user !== null;
  }

  public get getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public async logout() {
    return await this.fireAuth.signOut();
  }

  public async registerUser(userInfo){
    const result = await this.fireAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    await this.fireStore.collection('users').doc(result.user.uid).set({
      email: result.user.email,
      name: '',
      projects: [],
    });

    return result;
  }
  public async updateUser(user: User): Promise<void>{
    await this.fireStore.collection('users').doc(user.uid).update(user);
  }

  public getProjectsByUser(): Observable<Project[]>{
    return this.fireStore.collection<Project>('projects', ref =>
      ref.where('members', 'array-contains', this.getUser.uid)).valueChanges({idField: 'uid'});
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return await this.fireAuth.signInWithEmailAndPassword(email, password);
  }
}
