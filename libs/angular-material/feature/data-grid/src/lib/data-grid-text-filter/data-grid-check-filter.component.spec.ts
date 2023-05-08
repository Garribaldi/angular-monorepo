import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridCheckFilterComponent } from './data-grid-check-filter.component';
import { MockModule } from "ng-mocks";
import { CdkTreeModule } from "@angular/cdk/tree";

describe('DataGridTextFilterComponent', () => {
  let component: DataGridCheckFilterComponent;
  let fixture: ComponentFixture<DataGridCheckFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(CdkTreeModule)
      ],
      declarations: [DataGridCheckFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridCheckFilterComponent);
    component = fixture.componentInstance;
    component.data = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
