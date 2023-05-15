import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MockModule, MockProvider } from "ng-mocks";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { of } from "rxjs";

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule)
      ],
      declarations: [DataGridDateFilterComponent],
      providers: [
        MockProvider(SelectedFilterStateService, {
          removedFilter$: of([]),
          updateFiltersByColumn: jest.fn(),
          removeFiltersByColumn: jest.fn()
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridDateFilterComponent);
    component = fixture.componentInstance;

    component.label = 'Test Label';
    component.column = 'name';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
