import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnDef, Inventory, SharedDataService } from '@local/shared/data-access';

@Component({
  selector: 'local-demo-angular-material-generic-table',
  templateUrl: './demo-generic-table.component.html',
  styleUrls: ['./demo-generic-table.component.scss']
})
export class DemoGenericTableComponent {

  inventory$: Observable<Inventory[]>;
  inventoryColumnDef: ColumnDef = {
    name: 'Item',
    price: 'Price',
    buy: 'Buy'
  };

  constructor(
    private readonly tableDataService: SharedDataService,
  ) {
    this.inventory$ = tableDataService.getInventory$();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }

  editElement(element: Inventory) {
    console.log(element);
  }

  deleteItem(item: Inventory) {
    console.log(item);
  }
}
