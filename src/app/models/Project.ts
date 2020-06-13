import {UserRole} from "./Role";
import {DocumentReference} from "@angular/fire/firestore";

export interface Project {
  id: string;
  uid: string;
  name: string;
  description: string;
  members: Array<DocumentReference>;
  roles: Array<UserRole>
  owner: DocumentReference;
  created_at: Date;
  status: string;
}
