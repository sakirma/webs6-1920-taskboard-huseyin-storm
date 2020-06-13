import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Project} from "../../models/Project";
import {Role, UserRole} from "../../models/Role";
import {AuthService} from "../../services/auth.service";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DocumentReference} from "@angular/fire/firestore";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['members', 'role'];
  email: string;

  @Input() project$: Observable<Project>
  userIsOwner: boolean;

  public project: Project;

  private subscription: Subscription;

  constructor(private auth: AuthService, private projectService: ProjectService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.project$.subscribe(project => {
      this.userIsOwner = project.owner.id === this.auth.getUser.uid;
      this.project = project;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public compareOwnerString(role: Role) {
    return role === Role.Owner;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: {email: this.email, project: this.project}
    });
  }

  public async removeUser(user: UserRole) {
    await this.projectService.removeUserFromProject(user, this.project);
  }

  public async promote(user: UserRole) {
     await this.projectService.makeUserOwner(user, this.project);
  }
}
