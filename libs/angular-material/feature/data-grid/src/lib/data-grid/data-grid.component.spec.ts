import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';


type TestData = [];


describe('DataGridComponent', () => {
  let component: DataGridComponent<TestData>;
  let fixture: ComponentFixture<DataGridComponent<TestData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent<TestData>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
