import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { Employee } from "@local/shared/data-access";

describe('TableComponent', () => {

  const employee: Employee[] = [{
    firstName: 'Employee',
    lastName: 'One'
  }];

  let component: TableComponent<Employee>;
  let fixture: ComponentFixture<TableComponent<Employee>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<TableComponent<Employee>>(TableComponent);
    component = fixture.componentInstance;
    component.data = employee;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
