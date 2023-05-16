import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { Employee } from "./employee.model";
import { Inventory } from "./inventory.model";
import { City } from "./city.model";
import { Country } from "./country.model";
import { countries, inventory } from "./shared-data-mocks";
import { NbaTeam, NbaTeamDto } from "./nba-team.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getEmployees$(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('../assets/employees.json');
  }

  getCities$(): Observable<City[]> {
    return this.httpClient.get<City[]>('../assets/cities.json');
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
    return this.httpClient.get<NbaTeamDto[]>('../assets/nba-teams.json')
      .pipe(
        map(nbaTeamDto => nbaTeamDto.map(team => this.mapToNbaTeam(team)))
      );
  }

  private mapToNbaTeam(team: NbaTeamDto): NbaTeam {
    return {...team, date: new Date(team.date)};
  }
}
