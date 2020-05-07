import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {auth, User} from "firebase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {

  }

  get getUser(): Observable<User | null> {
    return this.auth.user;
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
