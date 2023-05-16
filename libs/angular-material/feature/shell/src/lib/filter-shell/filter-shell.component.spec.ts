import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterShellComponent } from './filter-shell.component';
import { MockComponent, MockModule, MockProvider } from "ng-mocks";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { FilterComponent } from "@local/angular-material/feature/filter";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

describe('FilterShellComponent', () => {
  let component: FilterShellComponent;
  let fixture: ComponentFixture<FilterShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatTableModule)
      ],
      declarations: [
        FilterShellComponent,
        MockComponent(FilterComponent)
      ],
      providers: [
        MockProvider(SharedDataService, {
          getNbaTeams$: () => of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
