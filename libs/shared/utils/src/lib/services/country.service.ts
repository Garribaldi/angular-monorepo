import { Injectable } from '@angular/core';
import { Country } from "@local/shared/data-access";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  /**
   * Takes a sorted country list and an array of numbers which represent the iso code of preferred countries.
   * These countries are moved to the beginning of the sorted list.
   * @param countries sorted country list
   * @param isoList number array with iso codes of preferred countries
   * @return altered country list
   */
  setPreferredCountries(countries: Country[], isoList: number[]): Country[] {

    const preferredCountries = isoList
      .map(currIso => countries.find((country, index) => {
        if (country.iso === currIso) {
          countries.splice(index, 1);
          return true;
        }
        return false;
      }))
      .filter((preferredCountry: Country | undefined): preferredCountry is Country => preferredCountry !== undefined)
      .sort((a, b) => a.name > b.name ? 1 : -1);

    countries.unshift(...preferredCountries);
    return countries;
  }
}
