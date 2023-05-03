import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MockModule } from "ng-mocks";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

type ComponentTestType = { name: string; value: string };

const testData: ComponentTestType[] = [
  {
    name: "Atlanta Hawks",
    value: "Atlanta"
  },
  {
    name: "Boston Celtics",
    value: "Boston"
  },
  {
    name: "Brooklyn Nets",
    value: "Brooklyn"
  }
];

describe('FilterComponent', () => {
  let component: FilterComponent<ComponentTestType>;
  let fixture: ComponentFixture<FilterComponent<ComponentTestType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatFormFieldModule),
        MockModule(MatSelectModule),
        MockModule(MatInputModule),
        MockModule(NgxMatSelectSearchModule),
        ReactiveFormsModule
      ],
      declarations: [FilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent<ComponentTestType>);
    component = fixture.componentInstance;

    component.unfilteredData = testData;
    component.filterColumn = 'name';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('populate filter', () => {
  });

  describe('ngOnChanges()', () => {
  });

  describe('clearFilterSearch()', () => {
  });
});
