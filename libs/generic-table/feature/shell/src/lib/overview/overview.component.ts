import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ColumnDef, Employee, Inventory, TableDataService } from "@local/shared/data-access";

@Component({
  selector: 'generic-table-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  employees$: Observable<Employee[]>;
  inventory$: Observable<Inventory[]>;

  employeeColumnDef: ColumnDef = {
    firstName: 'First Name',
    lastName: 'Last Name'
  };

  inventoryColumnDef: ColumnDef = {
    name: 'Item',
    price: 'Price',
    buy: 'Buy'
  }

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
