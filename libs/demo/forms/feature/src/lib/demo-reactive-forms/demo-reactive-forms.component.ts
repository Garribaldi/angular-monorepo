import { Component } from '@angular/core';
import { combineLatest, map, Observable, startWith, tap } from "rxjs";
import { Employee, SharedDataService } from "@local/shared/data-access";
import { FormBuilder, Validators } from "@angular/forms";
import { CountryService } from "@local/shared/utils";
import { SelectOptions } from "@local/forms/reactive-fields/feature";

type ReactiveFormsRequests = { cities: SelectOptions[], countries: SelectOptions[], employee: Employee };

@Component({
  selector: 'local-demo-reactive-forms',
  templateUrl: './demo-reactive-forms.component.html',
  styleUrls: ['./demo-reactive-forms.component.scss'],
})
export class DemoReactiveFormsComponent {

  requests$: Observable<ReactiveFormsRequests>;

  cities$!: Observable<SelectOptions[]>;
  employee$!: Observable<Employee>;
  countries$!: Observable<SelectOptions[]>;

  /**
   * To benefit from type safety, declare form group outside of constructor / ngOnInit.
   * Otherwise, form group uses _any_ and type safety is lost:
   *
   * {@link https://blog.angular-university.io/angular-typed-forms/}
   */
  testForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  constructor(
    private readonly dataService: SharedDataService,
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder
  ) {
    this.cities$ = dataService.getCities$().pipe(map(cities => cities.map((city): SelectOptions => ({
      value: city.name,
      text: city.name
    }))));

    this.countries$ = dataService.getCountries$().pipe(
      startWith([]),
      map(countries => countryService.setPreferredCountries(countries, ['CHE'])),
      map(countries => countries.map((country): SelectOptions => ({value: country.iso, text: country.name})))
    );

    this.employee$ = dataService.getEmployees$().pipe(
      map((employees) => (employees[1])),
      tap(employee => this.testForm.patchValue(employee))
    );

    this.requests$ = combineLatest([
      this.cities$,
      this.countries$,
      this.employee$
    ]).pipe(
      map(([cities, countries, employee]): ReactiveFormsRequests => ({cities, countries, employee}))
    );
  }

  onSubmit() {
    console.warn(this.testForm.value);
  }
}
