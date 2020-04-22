import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {User, auth} from "firebase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {

  }

  public signInWithPopup() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
      // TODO: redirect to projects page
    );
  }

  public logout() {
    this.auth.signOut();
  }

  public getUser() : Observable<User | null> {
    return this.auth.user;
  }
}
