import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SprintService} from '../../../services/sprint.service';
import {Observable} from 'rxjs';
import {Sprint} from '../../../models/Sprint';

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.scss']
})
export class EditSprintComponent implements OnInit {
  public sprintForm: FormGroup;

  private projectID: string;
  private sprintID: string;

  private sprint$: Observable<Sprint>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private sprintService: SprintService, private router: Router) {
    route.params.subscribe(async value => {
      this.projectID = value.uid;
      this.sprintID = value.sprintID;

      /*this.sprint$ = await this.sprintService.getSprintDoc(this.sprintID, this.projectID).then(sprint => {
        return sprint.get().subscribe(s => {
          return s.data();
        });
      });*/

      this.sprintForm = this.fb.group({
        name: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required]
      }, { validators: this.dateValidator });

      this.sprint$.subscribe(sprint => {
        this.sprintForm.get('name').setValue(sprint.name);
        this.sprintForm.get('startDate').setValue(sprint.start_date.toDate());
        this.sprintForm.get('endDate').setValue(sprint.end_date.toDate());
      });
    });
  }

  ngOnInit(): void {
  }

  private dateValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const startDate = group.get('startDate').value;
    const endDate = group.get('endDate').value;

    return (startDate < endDate) ? null : { dateNotValid: true };
  }

  public async updateSprint() {
    const sprint = {
      name: this.sprintForm.get('name').value,
      start_date: new Date(this.sprintForm.get('startDate').value),
      active: false,
      end_date: new Date(this.sprintForm.get('endDate').value),
      created_at: new Date(),
      user_stories: []
    };
    await this.sprintService.updateSprint(this.projectID, sprint);
    await this.router.navigate(['project', { uid: this.projectID}] );
  }

}
