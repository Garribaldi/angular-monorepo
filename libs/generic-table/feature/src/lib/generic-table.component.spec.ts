import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableComponent } from './generic-table.component';
import { Employee } from '@local/shared/data-access';

describe('GenericTableComponent', () => {
  const employee: Employee[] = [
    {
      firstName: 'Employee',
      lastName: 'One',
    },
  ];

  let component: GenericTableComponent<Employee>;
  let fixture: ComponentFixture<GenericTableComponent<Employee>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<GenericTableComponent<Employee>>(GenericTableComponent);
    component = fixture.componentInstance;
    component.data = employee;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
