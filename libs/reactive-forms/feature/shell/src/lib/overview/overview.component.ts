import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { City, Country, Employee, SharedDataService } from "@local/shared/data-access";
import { map, Observable, tap } from "rxjs";
import { CountryService, validatePasswordStrength } from "@local/shared/utils";

@Component({
  selector: 'local-reactive-forms-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  cities$!: Observable<City[]>;
  employee$!: Observable<Employee>;
  countries$!: Observable<Country[]>;


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
    city: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  constructor(
    private readonly dataService: SharedDataService,
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder
  ) {
    this.cities$ = dataService.getCities$();
    this.countries$ = dataService.getCountries$().pipe(
      map(countries => countryService.setPreferredCountries(countries, ['CHE']))
    );
    this.employee$ = dataService.getEmployees$().pipe(
      map((employees) => (employees[1])),
      tap(employee => this.testForm.patchValue(employee))
    );
  }

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
