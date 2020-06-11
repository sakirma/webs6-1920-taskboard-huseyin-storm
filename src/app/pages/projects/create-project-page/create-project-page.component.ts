import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../services/projects.service';
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

  constructor(private projectsService: ProjectsService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.projectForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
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

    await this.projectsService.createProject(projectInfo);
    await this.router.navigate(['projects']);
  }
}
