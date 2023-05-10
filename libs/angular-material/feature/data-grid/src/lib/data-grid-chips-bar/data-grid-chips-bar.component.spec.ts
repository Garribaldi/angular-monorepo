import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridChipsBarComponent } from './data-grid-chips-bar.component';
import { Filter } from "@local/angular-material/feature/data-grid";
import { MatChipsModule } from "@angular/material/chips";
import { MockModule } from "ng-mocks";

describe('DataGridChipsBarComponent', () => {
  let component: DataGridChipsBarComponent;
  let fixture: ComponentFixture<DataGridChipsBarComponent>;

  const testFilters: Filter[] = [];

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
