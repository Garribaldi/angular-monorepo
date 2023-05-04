import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogShellComponent } from './dialog-shell.component';
import { MockModule } from "ng-mocks";
import { MatDialogModule } from "@angular/material/dialog";

describe('DialogShellComponent', () => {
  let component: DialogShellComponent;
  let fixture: ComponentFixture<DialogShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule)
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
