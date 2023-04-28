import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableShellComponent } from './generic-table-shell.component';

describe('OverviewComponent', () => {
  let component: GenericTableShellComponent;
  let fixture: ComponentFixture<GenericTableShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericTableShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
