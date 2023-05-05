import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { MockModule } from "ng-mocks";
import { MatCardModule } from "@angular/material/card";

type TestData = {name: string};

describe('DataGridComponent', () => {
  let component: DataGridComponent<TestData>;
  let fixture: ComponentFixture<DataGridComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule)
      ],
      declarations: [DataGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
