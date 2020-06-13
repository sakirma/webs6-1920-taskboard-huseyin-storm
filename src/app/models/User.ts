import {DocumentReference} from "@angular/fire/firestore";

export interface User {
  uid: string;
  name: string;
  email: string;
  projects: Array<string>;
  path: DocumentReference;
}
