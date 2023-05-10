import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { MockComponent, MockProvider } from "ng-mocks";
import { SelectedFilterStateService } from "../selected-filter-state.service";
import { DataSourceService } from "../data-source.service";
import { of } from "rxjs";
import { DataGridChipsBarComponent } from "@local/angular-material/feature/data-grid";

type TestData = { name: string };

describe('DataGridComponent', () => {
  let component: DataGridComponent<TestData>;
  let fixture: ComponentFixture<DataGridComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataGridComponent,
        MockComponent(DataGridChipsBarComponent)
      ],
      providers: [
        MockProvider(SelectedFilterStateService, {selectedFilter$: of([])}),
        MockProvider(DataSourceService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
