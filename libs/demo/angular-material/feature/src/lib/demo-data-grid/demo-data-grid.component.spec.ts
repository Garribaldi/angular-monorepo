import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDataGridComponent } from './demo-data-grid.component';
import { MockComponent, MockModule, MockProvider } from "ng-mocks";
import { MatCardModule } from "@angular/material/card";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { DataGridColumnComponent, DataGridComponent } from "@local/angular-material/data-grid/feature";
import { MatTableModule } from "@angular/material/table";


describe('DemoDataGridComponent', () => {
  let component: DemoDataGridComponent;
  let fixture: ComponentFixture<DemoDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatTableModule)
      ],
      declarations: [
        DemoDataGridComponent,
        MockComponent(DataGridComponent),
        MockComponent(DataGridColumnComponent)
      ],
      providers: [
        MockProvider(SharedDataService, {
          getNbaTeams$: () => of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
