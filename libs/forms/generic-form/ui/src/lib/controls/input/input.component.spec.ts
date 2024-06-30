import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NG_CONTROL_PROVIDER } from "../../../../../feature/src/test-setup";

describe('TextFieldComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatFormFieldModule)
      ],
      declarations: [
        InputComponent
      ],
    }).overrideComponent(InputComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
