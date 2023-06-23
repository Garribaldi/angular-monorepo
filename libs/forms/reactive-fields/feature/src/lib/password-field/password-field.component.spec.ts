import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordFieldComponent } from './password-field.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NG_CONTROL_PROVIDER } from "../../test-setup";

describe('PasswordFieldComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatFormFieldModule)
      ],
      declarations: [
        PasswordFieldComponent
      ],
    }).overrideComponent(PasswordFieldComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
