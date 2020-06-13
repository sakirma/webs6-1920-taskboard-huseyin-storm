import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {SprintService} from '../../../services/sprint.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss']
})
export class CreateSprintComponent implements OnInit {

  public sprintForm: FormGroup;
  private projectID: string;

  constructor(private fb: FormBuilder, private sprintService: SprintService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(async value => {
      this.projectID = value.uid;
    });

    this.sprintForm = this.fb.group({
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    }, { validators: this.dateValidator });

  }

  ngOnInit(): void {
  }

  private dateValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const startDate = group.get('startDate').value;
    const endDate = group.get('endDate').value;

    return (startDate < endDate) ? null : { dateNotValid: true };
  }

  public async addSprintToProject() {
    const sprint = {
      name: this.sprintForm.get('name').value,
      start_date: new Date(this.sprintForm.get('startDate').value),
      active: false,
      end_date: new Date(this.sprintForm.get('endDate').value),
      created_at: new Date(),
      user_stories: []
    };
    await this.sprintService.createSprint(this.projectID, sprint);
    await this.router.navigate(['project', { uid: this.projectID}] );
  }
}
