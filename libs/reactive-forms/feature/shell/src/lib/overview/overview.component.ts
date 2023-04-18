import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { City, Employee, SharedDataService } from "@local/shared/data-access";
import { map, Observable, tap } from "rxjs";

@Component({
  selector: 'reactive-forms-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  testForm!: FormGroup;

  cities$!: Observable<City[]>;
  employee$!: Observable<Employee>;

  constructor(
    private readonly dataService: SharedDataService,
    private readonly fb: FormBuilder
  ) {
    this.cities$ = dataService.getCities$();
    this.employee$ = dataService.getEmployees$().pipe(
      map((employees) => (employees[1])),
      tap(employee => this.testForm.patchValue(employee))
    );
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
