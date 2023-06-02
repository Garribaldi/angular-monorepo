import { Component } from '@angular/core';
import { NbaTeam, SharedDataService } from "@local/shared/data-access";
import { Observable } from "rxjs";


@Component({
  selector: 'local-demo-angular-material-filter',
  templateUrl: './demo-filter.component.html',
  styleUrls: ['./demo-filter.component.scss'],
})
export class DemoFilterComponent {

  unfilteredData$: Observable<NbaTeam[]>;
  displayedColumns: string[] = ['team', 'location'];

  dataSource: NbaTeam[] = [];
  filterColumn = 'location';

  constructor(
    private readonly sharedDataService: SharedDataService
  ) {
    this.unfilteredData$ = sharedDataService.getNbaTeams$();
  }

  setDisplayColumns(teams: NbaTeam[]) {
    this.dataSource = teams;
  }
}
