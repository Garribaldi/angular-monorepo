import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { TableDataService } from "@local/shared/data-access";
import { take } from "rxjs";

@Component({
  selector: 'reactive-forms-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  testForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(dataService: TableDataService) {

    dataService.getEmployees()
      .pipe(take(1))
      .subscribe(employees => this.testForm.patchValue(employees[0]));
  }

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
