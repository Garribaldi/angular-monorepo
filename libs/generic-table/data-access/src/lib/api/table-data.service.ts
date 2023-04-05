import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Employee } from "../models/employee.model";
import { Inventory } from "../models/inventory.model";


const employees: Employee[] = [
  {firstName: 'Employee', lastName: 'One'},
  {firstName: 'Employee', lastName: 'Two'},
  {firstName: 'Employee', lastName: 'Three'},
  {firstName: 'Employee', lastName: 'Four'},
  {firstName: 'Employee', lastName: 'Five'}
];

const inventory: Inventory[] = [
  {
    plu: 110,
    supplier: 'X Corp',
    name: 'Table extender',
    inStock: 500,
    price: 50,
    currency: 'GBP'
  },
  {
    plu: 120,
    supplier: 'X Corp',
    name: 'Heated toilet seat',
    inStock: 0,
    price: 80,
    currency: 'GBP'
  },
  {
    plu: 155,
    supplier: 'Y Corp',
    name: 'Really good pencil',
    inStock: 1,
    price: 8000,
    currency: 'AUD'
  },
  {
    plu: 165,
    supplier: 'Y Corp',
    name: 'Really good phone',
    inStock: 1,
    price: 8000,
    currency: 'AUD'
  }
];

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  getEmployees(): Observable<Employee[]> {
    return of(employees);
  }

  getInventory(): Observable<Inventory[]> {
    return of(inventory);
  }
}
