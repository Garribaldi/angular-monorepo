import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { Employee } from "../models/employee.model";
import { Inventory } from "../models/inventory.model";
import { City } from "../models/city.model";
import { Country } from "../models/country.model";

const employees: Employee[] = [
  {firstName: 'Employee', lastName: 'One', city: 'Boston'},
  {firstName: 'Employee', lastName: 'Two'},
  {firstName: 'Employee', lastName: 'Three'},
  {firstName: 'Employee', lastName: 'Four'},
  {firstName: 'Employee', lastName: 'Five'}
];

const inventory: Inventory[] = [
  {plu: 110, supplier: 'W Corp', name: 'Electric plug', inStock: 500, price: 50, currency: 'GBP'},
  {plu: 120, supplier: 'X Corp', name: 'Heated toilet seat', inStock: 2, price: 80, currency: 'EUR'},
  {plu: 120, supplier: 'X Corp', name: 'Heat pump', inStock: 0, price: 10800, currency: 'EUR'},
  {plu: 155, supplier: 'Y Corp', name: 'Golden pencil', inStock: 4, price: 4500, currency: 'AUD'},
  {plu: 165, supplier: 'Z Corp', name: 'iPhone 20', inStock: 0, price: 8000, currency: 'USD'}
];

const cities: City[] = [
  {name: 'Miami'},
  {name: 'New York'},
  {name: 'Boston'},
  {name: 'Chicago'}
];

const countries: Country[] = [
  {name: 'Hungary', iso: 348},
  {name: 'Germany', iso: 276},
  {name: 'Jamaica', iso: 388},
  {name: 'Switzerland', iso: 756},
  {name: 'Korea', iso: 410},
  {name: 'Greece', iso: 300},
  {name: 'Croatia', iso: 191},
  {name: 'Nepal', iso: 524},
  {name: 'Paraguay', iso: 600},
  {name: 'Vietnam', iso: 704},
  {name: 'Sweden', iso: 752},
  {name: 'United States', iso: 581},
  {name: 'Zambia', iso: 894},
  {name: 'Slovenia', iso: 705},
  {name: 'Thailand', iso: 764},
  {name: 'United Kingdom', iso: 826},
  {name: 'Serbia', iso: 688},
  {name: 'Bulgaria', iso: 100}
];


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  getEmployees$(): Observable<Employee[]> {
    return of(employees);
  }

  getCities$(): Observable<City[]> {
    return of(cities);
  }

  getInventory$(): Observable<Inventory[]> {
    return of(inventory);
  }

  getCountries$(): Observable<Country[]> {
    return of(countries).pipe(
      map(countrylist => countrylist.sort((a, b) => a.name > b.name ? 1 : -1))
    );
  }
}
