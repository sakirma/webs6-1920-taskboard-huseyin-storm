import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project-page',
  templateUrl: './create-project-page.component.html',
  styleUrls: ['./create-project-page.component.scss']
})
export class CreateProjectPageComponent implements OnInit {

  public projectForm: FormGroup;

  constructor(private projectsService: ProjectService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.projectForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
    });
  }

  ngOnInit(): void {
  }

  public async createProject(){
    if (!this.projectForm.valid) { return; }

    const projectInfo = {
      name: this.projectForm.get('name').value,
      description: this.projectForm.get('description').value,
      owner: this.authService.getUser.uid
    };

    const projectUid = await this.projectsService.createProject(projectInfo);
    const user = this.authService.getUser;

    user.projects = user.projects ??  [];
    user.projects.push(projectUid);

    await this.authService.updateUser(user);

    await this.router.navigate(['projects']);
  }
}
