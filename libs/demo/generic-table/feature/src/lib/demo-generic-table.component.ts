import { Component } from '@angular/core';
import { map, Observable } from "rxjs";
import { Employee, Inventory, SharedDataService } from "@local/shared/data-access";

@Component({
  selector: 'local-demo-generic-table',
  templateUrl: './demo-generic-table.component.html',
  styleUrls: ['./demo-generic-table.component.scss'],
})
export class DemoGenericTableComponent {

  employees$: Observable<Employee[]>;
  inventory$: Observable<Inventory[]>;
  constructor(
    private readonly sharedDataService: SharedDataService
  ) {
    this.employees$ = sharedDataService.getEmployees$().pipe(map(employees => employees.map(employee => ({firstName: employee.firstName, lastName: employee.lastName}))));
    this.inventory$ = sharedDataService.getInventory$();
  }
  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}
