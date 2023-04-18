import { Component } from '@angular/core';
import { Employee, SharedDataService } from "@local/shared/data-access";
import { Observable } from "rxjs";

@Component({
  selector: 'angular-material-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  displayedColumns = ["firstName", "lastName"];

  employees$: Observable<Employee[]>;

  constructor(
    private readonly tableDataService: SharedDataService
  ) {
    this.employees$ = tableDataService.getEmployees$();
  }
}
