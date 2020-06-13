import { Injectable } from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {User} from "../models/User";
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: FirestoreService) {

  }

  public async getUserDocRef(email: String) : Promise<DocumentReference> {
    let data = await this.db.col<User>('users', ref =>
      ref.where('email', '==', email)).get().toPromise();

    return data.docs.length > 0 ? data.docs[0].ref : null;
  }
}
