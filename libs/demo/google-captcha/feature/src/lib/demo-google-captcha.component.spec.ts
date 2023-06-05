import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoGoogleCaptchaComponent } from './demo-google-captcha.component';
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MockModule } from "ng-mocks";
import { GoogleCaptchaModule } from "@local/google-captcha/feature";

describe('GoogleCaptchaComponent', () => {
  let component: DemoGoogleCaptchaComponent;
  let fixture: ComponentFixture<DemoGoogleCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        MockModule(GoogleCaptchaModule),
        FormsModule
      ],
      declarations: [
        DemoGoogleCaptchaComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoGoogleCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
