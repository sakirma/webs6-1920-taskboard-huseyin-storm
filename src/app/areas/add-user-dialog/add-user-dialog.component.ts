import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";

export interface DialogData {
  email: string;
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
    private userService: UserService) {
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  public async onDoneClick() {
    if (await this.userService.userExists(this.data.email)) {
      this.dialogRef.close();
    } else {
    }
  }
}
