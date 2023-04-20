import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { City, Employee, SharedDataService } from "@local/shared/data-access";
import { map, Observable, tap } from "rxjs";
import { validatePasswordStrength } from "@local/shared/utils";

@Component({
  selector: 'reactive-forms-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  cities$!: Observable<City[]>;
  employee$!: Observable<Employee>;

  /**
   * To benefit from type safety, declare form group outside of constructor / ngOnInit.
   * Otherwise, from group uses _any_ and type safety is lost:
   *
   * {@link https://blog.angular-university.io/angular-typed-forms/}
   */
  testForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), validatePasswordStrength()]],
    city: ['', [Validators.required]]
  });

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

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
