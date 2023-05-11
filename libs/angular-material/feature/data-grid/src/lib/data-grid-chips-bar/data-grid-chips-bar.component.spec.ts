import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridChipsBarComponent } from './data-grid-chips-bar.component';
import { MatChipsModule } from "@angular/material/chips";
import { MockModule } from "ng-mocks";
import { Filter } from "../models/filter.model";
import { GroupedFilter } from "../models/grouped-filter.model";

describe('DataGridChipsBarComponent', () => {
  let component: DataGridChipsBarComponent;
  let fixture: ComponentFixture<DataGridChipsBarComponent>;

  const testFilters: GroupedFilter = new Map<string, Filter[]>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatChipsModule)
      ],
      declarations: [
        DataGridChipsBarComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridChipsBarComponent);
    component = fixture.componentInstance;
    component.filters = testFilters;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
