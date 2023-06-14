import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoChartsComponent } from './demo-charts.component';
import { ChartsModule } from "@local/charts/feature";
import { MockModule } from "ng-mocks";

describe('DemoChartsComponent', () => {
  let component: DemoChartsComponent;
  let fixture: ComponentFixture<DemoChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ChartsModule)
      ],
      declarations: [DemoChartsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
