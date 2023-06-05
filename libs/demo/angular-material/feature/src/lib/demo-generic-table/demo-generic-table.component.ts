import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ColumnDef, Employee, Inventory, SharedDataService } from "@local/shared/data-access";

@Component({
  selector: 'local-demo-angular-material-generic-table',
  templateUrl: './demo-generic-table.component.html',
  styleUrls: ['./demo-generic-table.component.scss'],
})
export class DemoGenericTableComponent {
  employees$: Observable<Employee[]>;
  inventory$: Observable<Inventory[]>;

  employeeColumnDef: ColumnDef = {
    firstName: 'First Name',
    lastName: 'Last Name',
  };

  inventoryColumnDef: ColumnDef = {
    name: 'Item',
    price: 'Price',
    buy: 'Buy',
  };

  constructor(
    private readonly tableDataService: SharedDataService
  ) {
    this.employees$ = tableDataService.getEmployees$();
    this.inventory$ = tableDataService.getInventory$();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}