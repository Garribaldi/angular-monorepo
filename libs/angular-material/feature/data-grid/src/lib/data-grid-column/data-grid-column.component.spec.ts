import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridColumnComponent } from './data-grid-column.component';

describe('DataGridColumnComponent', () => {
  let component: DataGridColumnComponent;
  let fixture: ComponentFixture<DataGridColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
