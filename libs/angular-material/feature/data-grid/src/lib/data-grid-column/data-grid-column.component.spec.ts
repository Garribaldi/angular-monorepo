import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';
import { MockComponents, MockDirective, MockPipe, MockProvider } from "ng-mocks";
import { DataSourceService } from "../data-source.service";
import { FilterType } from "../models/filter-type.model";
import { DataGridCheckFilterComponent } from "../data-grid-check-filter/data-grid-check-filter.component";
import { DataGridDateFilterComponent } from "../data-grid-date-filter/data-grid-date-filter.component";
import { Filter } from "../models/filter.model";
import { of } from "rxjs";
import { ToSlashCasePipe } from "@local/shared/utils";
import { CypressSelectorDirective } from "../../../../../../shared/utils/src/lib/directives/cypress-selector.directive";

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
        MockComponents(DataGridCheckFilterComponent, DataGridDateFilterComponent),
        MockPipe(ToSlashCasePipe),
        MockDirective(CypressSelectorDirective)
      ],
      providers: [
        MockProvider(DataSourceService, {
          getCheckFilter: jest.fn().mockReturnValue(testFilter),
          dataSourceChanged$: of(void '')
        })
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
