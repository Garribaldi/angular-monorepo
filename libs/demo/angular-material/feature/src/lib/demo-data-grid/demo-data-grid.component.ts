import { Component } from '@angular/core';
import { take } from 'rxjs';
import { NbaTeam, SharedDataService } from '@local/shared/data-access';

@Component({
  selector: 'local-demo-data-grid',
  templateUrl: './demo-data-grid.component.html',
  styleUrls: ['./demo-data-grid.component.scss']
})
export class DemoDataGridComponent {

  displayedColumns: string[] = ['teamId', 'teamName', 'simpleName', 'location', 'abbreviation', 'date'];

  dataSource: NbaTeam[] = [];
  filteredDataSource: NbaTeam[] = [];

  constructor(
    private readonly sharedDataService: SharedDataService
  ) {
    this.sharedDataService.getNbaTeams$()
      .pipe(take(1))
      .subscribe(data => this.dataSource = data);
  }

  onFilter(filteredData: NbaTeam[]) {
    this.filteredDataSource = filteredData;
  }
}
