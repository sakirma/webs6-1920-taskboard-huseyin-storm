import { Component, OnInit } from '@angular/core';
import {SprintService} from '../../services/sprint.service';

@Component({
  selector: 'app-sprints-overview',
  templateUrl: './sprints-overview.component.html',
  styleUrls: ['./sprints-overview.component.scss']
})
export class SprintsOverviewComponent implements OnInit {

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
  }

}
