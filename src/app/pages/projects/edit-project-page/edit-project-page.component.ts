import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/Project';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-project-page',
  templateUrl: './edit-project-page.component.html',
  styleUrls: ['./edit-project-page.component.scss']
})
export class EditProjectPageComponent implements OnInit {

  public projectForm: FormGroup;
  public editedProject: Project;

  constructor(private projectsService: ProjectService, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.projectForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
    });

    this.editedProject = this.projectsService.selectedProject;
    this.projectForm.get('name').setValue(this.editedProject.name);
    this.projectForm.get('description').setValue(this.editedProject.description);
  }

  ngOnInit(): void {
  }

  public async updateProject(){
    if (this.projectForm.invalid) { return; }
    this.editedProject.name = this.projectForm.get('name').value;
    this.editedProject.description = this.projectForm.get('description').value;

    await this.projectsService.updateProject(this.editedProject);
    await this.router.navigate(['projects']);
  }

}
