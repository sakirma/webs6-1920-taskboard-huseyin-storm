import {Component, Inject, Input} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {ProjectService} from "../../services/project.service";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Project} from "../../models/Project";

export interface DialogData {
  email: string;
  project: Project;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar) {
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public async onDoneClick() {
    const userRef = await this.userService.getUserDocRef(this.data.email);
    if (userRef) {
      if(this.projectService.projectIncludesUser(this.data.project, userRef))
      {
        this.snackBar.open("User already exists in the project", 'Dismiss', {duration: 3000});
        return;
      }

      await this.projectService.addUserToProject(this.data.project, userRef);
      this.dialogRef.close();
    } else {
      this.snackBar.open("Couldn't find the user", 'Dismiss', {duration: 3000});
    }
  }
}
