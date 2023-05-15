import { Inventory } from "./inventory.model";
import { Country } from "./country.model";

export const inventory: Inventory[] = [
  {plu: 110, supplier: 'W Corp', name: 'Electric plug', inStock: 500, price: 50, currency: 'GBP'},
  {plu: 120, supplier: 'X Corp', name: 'Heated toilet seat', inStock: 2, price: 80, currency: 'EUR'},
  {plu: 120, supplier: 'X Corp', name: 'Heat pump', inStock: 0, price: 10800, currency: 'EUR'},
  {plu: 155, supplier: 'Y Corp', name: 'Golden pencil', inStock: 4, price: 4500, currency: 'AUD'},
  {plu: 165, supplier: 'Z Corp', name: 'iPhone 20', inStock: 0, price: 8000, currency: 'USD'}
];



export const countries: Country[] = [
  {name: 'Hungary', iso: 'HUN'},
  {name: 'Germany', iso: 'DEU'},
  {name: 'Jamaica', iso: 'JAM'},
  {name: 'Switzerland', iso: 'CHE'},
  {name: 'Korea', iso: 'KOR'},
  {name: 'Greece', iso: 'GRC'},
  {name: 'Croatia', iso: 'HRV'},
  {name: 'Nepal', iso: 'NPL'},
  {name: 'Paraguay', iso: 'PRY'},
  {name: 'Vietnam', iso: 'VNM'},
  {name: 'Sweden', iso: 'SWE'},
  {name: 'United States', iso: 'USA'},
  {name: 'Zambia', iso: 'ZMB'},
  {name: 'Slovenia', iso: 'SVN'},
  {name: 'Thailand', iso: 'THA'},
  {name: 'United Kingdom', iso: 'GBR'},
  {name: 'Serbia', iso: 'SRB'},
  {name: 'Bulgaria', iso: 'BGR'}
];
