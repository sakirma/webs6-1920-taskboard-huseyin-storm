import { Injectable } from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: FirestoreService) {

  }

  public async userExists(email: String) : Promise<Boolean> {
    let data = await this.db.col<User>('users', ref =>
      ref.where('email', '==', email));

    console.log(data);
    return false;
  }
}
