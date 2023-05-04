import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MockModule, MockProvider } from "ng-mocks";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../dialog-data.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatOptionModule } from "@angular/material/core";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule),
        MockModule(MatFormFieldModule),
        MockModule(MatDatepickerModule),
        MockModule(ReactiveFormsModule),
        MockModule(MatOptionModule)
      ],
      declarations: [DialogComponent],
      providers: [
        MockProvider(MatDialogRef),
        {provide: MAT_DIALOG_DATA, useFactory: () => ({description: '', category: '', date: null} as DialogData)}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
