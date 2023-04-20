import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogShellComponent } from './dialog-shell.component';
import { MockModule } from "ng-mocks";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

describe('DialogShellComponent', () => {
  let component: DialogShellComponent;
  let fixture: ComponentFixture<DialogShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule),
        MockModule(MatFormFieldModule),
        MockModule(FormsModule)
      ],
      declarations: [DialogShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
