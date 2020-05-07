import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.signInWithEmailAndPassword(this.loginForm.get("email").value, this.loginForm.get("password").value)
      .then(() => {

      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        this.snackBar.open(`${errorMessage}`)
      })
  }
}
