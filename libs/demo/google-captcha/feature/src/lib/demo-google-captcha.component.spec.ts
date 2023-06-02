import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoGoogleCaptchaComponent } from './demo-google-captcha.component';
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MockComponent } from "ng-mocks";
import { Captchav2Component, Captchav3Component } from "@local/google-captcha/feature";

describe('GoogleCaptchaComponent', () => {
  let component: DemoGoogleCaptchaComponent;
  let fixture: ComponentFixture<DemoGoogleCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        FormsModule
      ],
      declarations: [
        DemoGoogleCaptchaComponent,
        MockComponent(Captchav2Component),
        MockComponent(Captchav3Component)
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
