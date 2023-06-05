import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoGenericTableComponent } from './demo-generic-table.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { SharedDataService } from '@local/shared/data-access';
import { of } from 'rxjs';
import { AngularMaterialGenericTableModule } from '@local/angular-material/generic-table/feature';

describe('OverviewComponent', () => {
  let component: DemoGenericTableComponent;
  let fixture: ComponentFixture<DemoGenericTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(AngularMaterialGenericTableModule)],
      declarations: [DemoGenericTableComponent],
      providers: [
        MockProvider(SharedDataService, {
          getEmployees$: () => of([]),
          getInventory$: () => of([]),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoGenericTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
