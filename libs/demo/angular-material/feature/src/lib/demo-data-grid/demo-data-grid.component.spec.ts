import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDataGridComponent } from './demo-data-grid.component';
import { MockComponent, MockModule, MockProvider } from "ng-mocks";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { DataGridComponent } from "../../../../data-grid/src/lib/data-grid/data-grid.component";
import { DataGridColumnComponent } from "../../../../data-grid/src/lib/data-grid-column/data-grid-column.component";

describe('DataGridShellComponent', () => {
  let component: DemoDataGridComponent;
  let fixture: ComponentFixture<DemoDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatTableModule)
      ],
      declarations: [
        DataGridComponent,
        MockComponent(DataGridComponent),
        MockComponent(DataGridColumnComponent)
      ],
      providers: [
        MockProvider(SharedDataService, {
          getNbaTeams$: () => of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
