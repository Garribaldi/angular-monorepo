import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ColumnDef, Employee, Inventory, SharedDataService } from "@local/shared/data-access";

@Component({
  selector: 'agr-angular-material-generic-table-overview',
  templateUrl: './generic-table-shell.component.html',
  styleUrls: ['./generic-table-shell.component.scss'],
})
export class GenericTableShellComponent {
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

  constructor(private readonly tableDataService: SharedDataService) {
    this.employees$ = tableDataService.getEmployees$();
    this.inventory$ = tableDataService.getInventory$();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}
