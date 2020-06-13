import {Role} from "./Role";
import {DocumentReference} from "@angular/fire/firestore";

export interface Project {
  id: string;
  name: string;
  description: string;
  members: Array<DocumentReference>;
  roles: Array<{role: Role, user: DocumentReference}>
  owner: string;
  created_at: Date;
  status: string;
}
