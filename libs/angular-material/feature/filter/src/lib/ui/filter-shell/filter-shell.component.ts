import { Component } from '@angular/core';
import { NbaTeam, SharedDataService } from "@local/shared/data-access";
import { Observable } from "rxjs";


@Component({
  selector: 'local-angular-material-filter-shell',
  templateUrl: './filter-shell.component.html',
  styleUrls: ['./filter-shell.component.scss'],
})
export class FilterShellComponent {

  unfilteredData$: Observable<NbaTeam[]>;
  displayedColumns: string[] = ['team', 'location'];

  dataSource: NbaTeam[] = [];
  filterColumn = 'teamName';

  constructor(
    sharedDataService: SharedDataService
  ) {
    this.unfilteredData$ = sharedDataService.getNbaTeams$();
  }

  setDisplayColumns(teams: NbaTeam[]) {
    this.dataSource = teams;
  }
}
