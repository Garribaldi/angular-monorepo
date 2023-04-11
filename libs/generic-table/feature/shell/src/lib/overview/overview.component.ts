import { Component } from '@angular/core';
import { Employee, Inventory, TableDataService } from "@local/generic-table/data-access";
import { Observable } from "rxjs";


@Component({
  selector: 'generic-table-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  displayedColumns = ["firstName", "lastName"];

  employees$: Observable<Employee[]>;
  inventory$: Observable<Inventory[]>

  constructor(
    private readonly tableDataService: TableDataService
  ) {
    this.employees$ = tableDataService.getEmployees();
    this.inventory$ = tableDataService.getInventory();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}
