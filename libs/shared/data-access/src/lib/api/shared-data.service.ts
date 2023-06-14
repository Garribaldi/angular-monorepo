import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from "rxjs";
import { Employee, EmployeeDto } from "./employee.model";
import { Inventory, InventoryDto } from "./inventory.model";
import { City, CityDto } from "./city.model";
import { Country, CountryDto } from "./country.model";
import { NbaTeam, NbaTeamDto } from "./nba-team.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { mapToEmployee, mapToNbaTeam } from "./mapper";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private readonly backendUrl: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: EnvironmentsService
  ) {
    this.backendUrl = environment.backendUrl;
  }

  getEmployees$(): Observable<Employee[]> {
    const url = `${this.backendUrl}/employees`;
    return this.httpClient.get<EmployeeDto[]>(url).pipe(
      map(employees => employees.map(employee => mapToEmployee(employee)))
    );
  }

  getCities$(): Observable<City[]> {
    const url = `${this.backendUrl}/cities`;
    return this.httpClient.get<CityDto[]>(url).pipe(
      map(cities => cities.map(city => ({...city} as City))),
      catchError(() => of([]))
    );
  }

  getInventory$(): Observable<Inventory[]> {
    const url = `${this.backendUrl}/inventory`;
    return this.httpClient.get<InventoryDto[]>(url).pipe(
      map(inventories => inventories.map(inventory => ({...inventory} as Inventory)))
    );
  }

  getCountries$(): Observable<Country[]> {
    const url = `${this.backendUrl}/countries`;
    return this.httpClient.get<CountryDto[]>(url).pipe(
      map(countrylist => countrylist
        .map(country => ({...country} as Country))
        .sort((a, b) => a.name > b.name ? 1 : -1)
      ),
      catchError(() => of([]))
    );
  }

  getNbaTeams$(): Observable<NbaTeam[]> {
    const headers = new HttpHeaders().set('x-ignore-cache', 'false');
    const url = `${this.backendUrl}/nba-teams`;

    return this.httpClient.get<NbaTeamDto[]>(url, {headers}).pipe(
      map(nbaTeamDto => nbaTeamDto.map(team => mapToNbaTeam(team)))
    );
  }
}
