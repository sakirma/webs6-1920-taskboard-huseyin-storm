import {Injectable} from '@angular/core';
import {FirestoreService} from "./firestore.service";

export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: string;
  userRoles: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  constructor(private fireService: FirestoreService) {
  }

  public getProjects() {

  }
}
