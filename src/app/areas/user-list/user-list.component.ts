import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Project} from "../../models/Project";
import {Role} from "../../models/Role";
import {AuthService} from "../../services/auth.service";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  private subscription: Subscription;

  constructor(private auth: AuthService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
     this.subscription = this.project$.subscribe(e => {
      this.userIsOwner = e.owner === this.auth.getUser.uid;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareOwnerString(role: Role) {
    return role === Role.Owner;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: {email: this.email}
    });
  }

}
