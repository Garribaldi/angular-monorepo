import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableDataService } from "@local/shared/data-access";
import { take } from "rxjs";

@Component({
  selector: 'reactive-forms-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  testForm!: FormGroup;

  constructor(
    private readonly dataService: TableDataService,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.dataService.getEmployees()
      .pipe(take(1))
      .subscribe(employees => this.testForm.patchValue(employees[0]));
  }

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
