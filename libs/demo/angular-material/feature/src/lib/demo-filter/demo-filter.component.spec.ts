import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoFilterComponent } from './demo-filter.component';
import { MockComponent, MockModule, MockProvider } from "ng-mocks";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { FilterComponent } from "@local/angular-material/filter/feature";

describe('FilterShellComponent', () => {
  let component: DemoFilterComponent;
  let fixture: ComponentFixture<DemoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatTableModule)
      ],
      declarations: [
        DemoFilterComponent,
        MockComponent(FilterComponent)
      ],
      providers: [
        MockProvider(SharedDataService, {
          getNbaTeams$: () => of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
