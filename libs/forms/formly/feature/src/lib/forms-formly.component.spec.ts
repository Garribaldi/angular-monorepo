import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsFormlyComponent } from './forms-formly.component';
import { MockModule } from "ng-mocks";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";

describe('FormsFormlyComponent', () => {
  let component: FormsFormlyComponent;
  let fixture: ComponentFixture<FormsFormlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(ReactiveFormsModule),
        MockModule(FormlyModule.forRoot())
      ],
      declarations: [
        FormsFormlyComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsFormlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
