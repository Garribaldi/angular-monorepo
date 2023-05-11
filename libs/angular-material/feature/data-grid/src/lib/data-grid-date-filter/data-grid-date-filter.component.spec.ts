import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MockModule } from "ng-mocks";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Filter } from "../models/filter.model";

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;

  const testFilter = {label: 'Test'} as Filter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule)
      ],
      declarations: [DataGridDateFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridDateFilterComponent);
    component = fixture.componentInstance;
    component.filter = testFilter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
