import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableShellComponent } from './generic-table-shell.component';
import { MockModule, MockProvider } from "ng-mocks";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { AngularMaterialFeatureGenericTableModule } from "@local/angular-material/feature/generic-table";

describe('OverviewComponent', () => {
  let component: GenericTableShellComponent;
  let fixture: ComponentFixture<GenericTableShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(AngularMaterialFeatureGenericTableModule)
      ],
      declarations: [
        GenericTableShellComponent
      ],
      providers: [
        MockProvider(SharedDataService, {
        getEmployees$: () => of([]),
        getInventory$: () => of([])
      })]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
