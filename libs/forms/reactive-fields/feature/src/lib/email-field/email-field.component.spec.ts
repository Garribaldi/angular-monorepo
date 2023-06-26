import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailFieldComponent } from './email-field.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NG_CONTROL_PROVIDER } from "../../test-setup";

describe('EmailFieldComponent', () => {
  let component: EmailFieldComponent;
  let fixture: ComponentFixture<EmailFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatFormFieldModule)
      ],
      declarations: [
        EmailFieldComponent
      ],
    }).overrideComponent(EmailFieldComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    }).compileComponents();

    fixture = TestBed.createComponent(EmailFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
