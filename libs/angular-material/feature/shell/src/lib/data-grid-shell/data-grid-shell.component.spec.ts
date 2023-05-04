import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridShellComponent } from './data-grid-shell.component';
import { MockModule } from "ng-mocks";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

describe('DataGridShellComponent', () => {
  let component: DataGridShellComponent;
  let fixture: ComponentFixture<DataGridShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(MatTableModule)
      ],
      declarations: [DataGridShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
