import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NG_CONTROL_PROVIDER } from "../../../../../feature/src/test-setup";

describe('PasswordFieldComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatFormFieldModule)
      ],
      declarations: [
        PasswordComponent
      ],
    }).overrideComponent(PasswordComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
