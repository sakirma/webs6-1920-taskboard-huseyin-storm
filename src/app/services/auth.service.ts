import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from "firebase";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser>;


  constructor(private auth: AngularFireAuth) {

  }

  get getUser() : Observable<firebase.User | null> {
    return this.auth.authState;
  }

  public signInWithPopup() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      // TODO: redirect to projects page
    );
  }

  logout() {
    this.auth.signOut();
  }

  async signInWithEmailAndPassword(email: string, password: string) : Promise<any> {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}
