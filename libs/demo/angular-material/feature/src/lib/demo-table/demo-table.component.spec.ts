import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoTableComponent } from './demo-table.component';
import { MockProvider } from "ng-mocks";
import { SharedDataService } from "@local/shared/data-access";
import { of } from "rxjs";
import { MatTableModule } from "@angular/material/table";

describe('GenericTableComponent', () => {
  let component: DemoTableComponent;
  let fixture: ComponentFixture<DemoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [
        DemoTableComponent
      ],
      providers: [
        MockProvider(SharedDataService, {
          getEmployees$: () => of([])
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
