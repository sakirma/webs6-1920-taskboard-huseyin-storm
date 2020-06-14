import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
import {SprintService} from "../../services/sprint.service";
import {Sprint} from "../../models/Sprint";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input()
  sprint: Sprint;
  @Input()
  projectId: string;
  @Input()
  reload: EventEmitter<void>

  public lineChartData: ChartDataSets[] = [
  ];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true, circumference: 0
  };
  public lineChartColors: Color[] = [
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private sprintService: SprintService) {
  }

  async ngOnInit() {
    await this.renderBurndown();
    this.reload.subscribe(async () => await this.renderBurndown())
  }

  async renderBurndown(){
    const data = await this.sprintService.getBurnDown(this.projectId, this.sprint.id, this.sprint.start_date.toDate(), this.sprint.end_date.toDate());

    let dates = [];
    let actualLine = {data: [], label: 'Current stories', fill: false, lineTension: 0 };
    let optimalLine = { data: [], label: 'Optimal', fill: false, lineTension: 0  };

    for (let date of data) {
      dates.push(date.date)
      actualLine.data.push(date.open)
      optimalLine.data.push(date.optimal)
    }

    this.lineChartLabels = dates;
    this.lineChartData = [actualLine, optimalLine];

  }
}
