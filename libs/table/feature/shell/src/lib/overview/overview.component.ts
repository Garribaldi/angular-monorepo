import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Employee, Inventory, SharedDataService } from "@local/shared/data-access";

@Component({
  selector: 'local-table-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  employees$: Observable<Employee[]>;
  inventory$: Observable<Inventory[]>;

  constructor(
    private readonly sharedDataService: SharedDataService
  ) {
    this.employees$ = sharedDataService.getEmployees$();
    this.inventory$ = sharedDataService.getInventory$();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}
