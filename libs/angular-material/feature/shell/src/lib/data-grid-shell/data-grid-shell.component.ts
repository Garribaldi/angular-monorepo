import { Component } from '@angular/core';
import { take } from "rxjs";
import { NbaTeam, SharedDataService } from "@local/shared/data-access";


// abbreviation: string;
// teamName: string;
// simpleName: string;
// location: string;

@Component({
  selector: 'local-angular-material-data-grid-shell',
  templateUrl: './data-grid-shell.component.html',
  styleUrls: ['./data-grid-shell.component.scss'],
})
export class DataGridShellComponent {
  displayedColumns: string[] = ['teamId', 'teamName', 'simpleName', 'location', 'abbreviation'];

  dataSource: NbaTeam[] = [];

  constructor(
    sharedDataService: SharedDataService
  ) {
    sharedDataService.getNbaTeams$()
      .pipe(take(1))
      .subscribe(data => this.dataSource = data);
  }
}
