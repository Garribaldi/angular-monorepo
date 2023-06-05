import { Component } from '@angular/core';
import { Employee, SharedDataService } from "@local/shared/data-access";
import { Observable } from "rxjs";

@Component({
  selector: 'local-demo-angular-material-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
})
export class DemoTableComponent {

  displayedColumns = ["firstName", "lastName"];

  employees$: Observable<Employee[]>;

  constructor(
    private readonly tableDataService: SharedDataService
  ) {
    this.employees$ = tableDataService.getEmployees$();
  }
}
