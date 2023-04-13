import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableComponent } from './mat-table.component';
import { MockModule } from "ng-mocks";
import { MatTableModule } from "@angular/material/table";

describe('MatTableComponent', () => {
  let component: MatTableComponent<any>;
  let fixture: ComponentFixture<MatTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(MatTableModule)],
      declarations: [MatTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
