import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridCheckFilterComponent } from './data-grid-check-filter.component';
import { MockModule, MockProvider } from "ng-mocks";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { of } from "rxjs";
import { MatTreeModule } from "@angular/material/tree";
import { Filter } from "../models/filter.model";

describe('DataGridTextFilterComponent', () => {
  let component: DataGridCheckFilterComponent;
  let fixture: ComponentFixture<DataGridCheckFilterComponent>;

  const testFilters = [{label: 'Test', value: 'Test'} as Filter];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatTreeModule)
      ],
      declarations: [DataGridCheckFilterComponent],
      providers: [
        MockProvider(SelectedFilterStateService, {
          removedFilter$: of([]),
          resetAll$: of(void '')
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridCheckFilterComponent);
    component = fixture.componentInstance;
    component.filters = testFilters;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
