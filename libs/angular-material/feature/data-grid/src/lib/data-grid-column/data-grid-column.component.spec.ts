import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';
import { MockComponents, MockProvider } from "ng-mocks";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { DataSourceService } from "../data-source.service";
import { FilterType } from "../models/filter-type.model";
import { DataGridCheckFilterComponent } from "../data-grid-check-filter/data-grid-check-filter.component";
import { DataGridDateFilterComponent } from "../data-grid-date-filter/data-grid-date-filter.component";
import { Filter } from "../models/filter.model";

type TestData = { name: string };

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent<TestData>;
  let fixture: ComponentFixture<DataGridColumnComponent<TestData>>;

  const testFilter: Filter[] = [{
    id: '12345',
    column: 'name',
    type: FilterType.CHECK_FILTER,
    value: 'Test Value',
    displayValue: 'Test Value',
    label: 'Filter Test',
    hitCount: 2
  } as Filter];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataGridColumnComponent,
        MockComponents(DataGridCheckFilterComponent, DataGridDateFilterComponent)
      ],
      providers: [
        MockProvider(DataSourceService, {getCheckFilters: jest.fn().mockReturnValue(testFilter)}),
        MockProvider(SelectedFilterStateService, {removeFiltersByColumn: jest.fn()})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridColumnComponent<TestData>);
    component = fixture.componentInstance;

    component.column = 'name';
    component.label = 'Test'
    component.type = FilterType.CHECK_FILTER;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
