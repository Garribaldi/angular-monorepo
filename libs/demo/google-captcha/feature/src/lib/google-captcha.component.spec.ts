import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleCaptchaComponent } from './google-captcha.component';
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MockComponent } from "ng-mocks";
import { Captchav2Component, Captchav3Component } from "@local/google-captcha/feature";

describe('GoogleCaptchaComponent', () => {
  let component: GoogleCaptchaComponent;
  let fixture: ComponentFixture<GoogleCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
        FormsModule
      ],
      declarations: [
        GoogleCaptchaComponent,
        MockComponent(Captchav2Component),
        MockComponent(Captchav3Component)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
