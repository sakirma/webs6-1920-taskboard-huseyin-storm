import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public hidePassword = true;
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: this.passwordValidator });
  }

  ngOnInit(): void {
  }

  public onRegister() {
    if (!this.registerForm.valid) { return; }

    const userInfo = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    };

    this.authService.registerUser(userInfo)
      .then(e => {
        this.router.navigate(['/projects']);
      })
      .catch(error => {
      this.snackBar.open(`${error.message}`, 'Dismiss', { duration: 3000 });
    });


  }

  private passwordValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return (password === confirmPassword) ? null : { passwordsNotMatching: true };
  }

}
