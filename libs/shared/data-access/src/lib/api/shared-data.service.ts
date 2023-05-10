import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { Employee } from "./employee.model";
import { Inventory } from "./inventory.model";
import { City } from "./city.model";
import { Country } from "./country.model";
import { cities, countries, employees, inventory, nbaTeams } from "./shared-data-mocks";
import { NbaTeam } from "./nba-team.model";

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

  getNbaTeams$(): Observable<NbaTeam[]> {
    return of(nbaTeams);
  }
}
