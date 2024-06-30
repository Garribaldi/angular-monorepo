import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { NG_CONTROL_PROVIDER } from '../../../test-setup';

describe('SelectFieldComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatFormFieldModule),
        MockModule(MatSelectModule)
      ],
      declarations: [
        SelectComponent
      ],
    }).overrideComponent(SelectComponent, {
      add: {providers: [NG_CONTROL_PROVIDER]}
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
