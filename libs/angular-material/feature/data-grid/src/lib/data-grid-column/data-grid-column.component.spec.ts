import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';

type TestData = {name: string};

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent<TestData>;
  let fixture: ComponentFixture<DataGridColumnComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridColumnComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
