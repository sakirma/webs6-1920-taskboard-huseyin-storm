import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SprintService} from '../../../services/sprint.service';
import {Observable} from 'rxjs';
import {Sprint} from '../../../models/Sprint';
import {first} from "rxjs/operators";

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

  private currentSprint: Sprint;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private sprintService: SprintService,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.projectID = this.route.snapshot.params.pUid;
    this.sprintID = this.route.snapshot.params.stUid;

    let sprintDoc = await this.sprintService.getSprintDoc(this.projectID, this.sprintID);
    this.sprint$ = await this.sprintService.getSprint$(sprintDoc);
    let sprint = await this.sprint$.pipe(first()).toPromise();
    this.currentSprint = sprint;

    this.sprintForm = this.fb.group({
      name: [sprint.name, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    }, {validators: this.dateValidator});

    this.sprintForm.get("startDate").setValue(sprint.start_date.toDate());
    this.sprintForm.get("endDate").setValue(sprint.end_date.toDate());
  }

  private dateValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const startDate = group.get('startDate').value;
    const endDate = group.get('endDate').value;

    return (startDate < endDate) ? null : { dateNotValid: true };
  }

  public async updateSprint() {
    const sprint = {
      uid: this.currentSprint.uid,
      name: this.sprintForm.get('name').value,
      start_date: new Date(this.sprintForm.get('startDate').value),
      end_date: new Date(this.sprintForm.get('endDate').value),
      created_at: new Date(),
    };

    console.log(sprint);
    await this.sprintService.updateSprint(this.projectID, sprint);
    await this.router.navigate(['project', { uid: this.projectID}] );
  }

}
