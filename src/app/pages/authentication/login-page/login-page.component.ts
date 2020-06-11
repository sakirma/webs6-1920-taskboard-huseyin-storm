import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.signInWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .catch(error => {
        this.snackBar.open(`${error.message}`, 'Dismiss', { duration: 3000 });
      });
  }

  onLogout(): void {

  }

}
