import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Employee, EmployeeDto } from "./employee.model";
import { Inventory, InventoryDto } from "./inventory.model";
import { City, CityDto } from "./city.model";
import { Country, CountryDto } from "./country.model";
import { NbaTeam, NbaTeamDto } from "./nba-team.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getEmployees$(): Observable<Employee[]> {
    return this.httpClient.get<EmployeeDto[]>('../assets/employees.json').pipe(
      map(employees => employees.map(employee => ({...employee} as Employee)))
    );
  }

  getCities$(): Observable<City[]> {
    return this.httpClient.get<CityDto[]>('../assets/cities.json').pipe(
      map(cities => cities.map(city => ({...city} as City)))
    );
  }

  getInventory$(): Observable<Inventory[]> {
    return this.httpClient.get<InventoryDto[]>('../assets/inventory.json').pipe(
      map(inventories => inventories.map(inventory => ({...inventory} as Inventory)))
    );
  }

  getCountries$(): Observable<Country[]> {
    return this.httpClient.get<CountryDto[]>('../assets/countries.json').pipe(
      map(countrylist => countrylist
        .map(country => ({...country} as Country))
        .sort((a, b) => a.name > b.name ? 1 : -1))
    );
  }

  getNbaTeams$(): Observable<NbaTeam[]> {
    const headers = new HttpHeaders().set('x-ignore-cache', 'false');

    return this.httpClient.get<NbaTeamDto[]>('../assets/nba-teams.json', {headers}).pipe(
      map(nbaTeamDto => nbaTeamDto.map(team => this.mapToNbaTeam(team)))
    );
  }

  private mapToNbaTeam(team: NbaTeamDto): NbaTeam {
    return {...team, date: new Date(team.date)};
  }
}
