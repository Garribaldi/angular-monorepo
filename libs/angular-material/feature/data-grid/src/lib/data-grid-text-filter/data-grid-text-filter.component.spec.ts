import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridTextFilterComponent } from './data-grid-text-filter.component';
import { MockModule } from "ng-mocks";
import { CdkTreeModule } from "@angular/cdk/tree";

describe('DataGridTextFilterComponent', () => {
  let component: DataGridTextFilterComponent;
  let fixture: ComponentFixture<DataGridTextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(CdkTreeModule)
      ],
      declarations: [DataGridTextFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridTextFilterComponent);
    component = fixture.componentInstance;
    component.data = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
