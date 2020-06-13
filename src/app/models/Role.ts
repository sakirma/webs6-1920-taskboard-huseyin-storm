import {DocumentReference} from "@angular/fire/firestore";

export enum Role {
  Member = "Member",
  Owner = "Owner",
}

export class UserRole {
  user: DocumentReference;
  role: Role;
}
