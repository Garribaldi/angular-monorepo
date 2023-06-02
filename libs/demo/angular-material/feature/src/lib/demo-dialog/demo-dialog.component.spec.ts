import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDialogComponent } from './demo-dialog.component';
import { MockModule } from "ng-mocks";
import { MatDialogModule } from "@angular/material/dialog";

describe('DialogShellComponent', () => {
  let component: DemoDialogComponent;
  let fixture: ComponentFixture<DemoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatDialogModule)
      ],
      declarations: [DemoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
