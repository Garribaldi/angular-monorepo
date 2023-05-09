import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridDateFilterComponent } from './data-grid-date-filter.component';

describe('DataGridDateFilterComponent', () => {
  let component: DataGridDateFilterComponent;
  let fixture: ComponentFixture<DataGridDateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridDateFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
