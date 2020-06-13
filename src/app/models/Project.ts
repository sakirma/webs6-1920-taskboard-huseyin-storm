import {Roles} from "./Roles";
import {DocumentReference} from "@angular/fire/firestore";

export interface Project {
  id: string;
  name: string;
  description: string;
  members: Array<DocumentReference>;
  roles: Array<{role: Roles, user: DocumentReference}>
  owner: string;
  created_at: Date;
  status: string;
}
