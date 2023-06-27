import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ColumnDef, Inventory, SharedDataService } from "@local/shared/data-access";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'local-demo-angular-material-generic-table',
  templateUrl: './demo-generic-table.component.html',
  styleUrls: ['./demo-generic-table.component.scss'],
})
export class DemoGenericTableComponent {

  inventory$: Observable<Inventory[]>;
  inventoryColumnDef: ColumnDef = {
    name: 'Item',
    price: 'Price',
    buy: 'Buy',
  };

  editElement: Inventory | null = null;

  testForm = this.fb.group({
    name: ['']
  });

  constructor(
    private readonly tableDataService: SharedDataService,
    private readonly fb: FormBuilder
  ) {
    this.inventory$ = tableDataService.getInventory$();
  }

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }

  editRow(element: Inventory | null) {
    this.editElement = element;
    this.testForm.patchValue({name: element?.name});
  }
}
