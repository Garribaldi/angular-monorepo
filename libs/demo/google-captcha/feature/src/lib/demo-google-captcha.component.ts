import { Component } from '@angular/core';
import { RecaptchaComponent } from "ng-recaptcha";
import { MatRadioChange } from "@angular/material/radio";
import { CaptchaType } from "@local/google-captcha/data-access";

@Component({
  selector: 'local-demo-google-captcha',
  templateUrl: './demo-google-captcha.component.html',
  styleUrls: ['./demo-google-captcha.component.scss'],
})
export class DemoGoogleCaptchaComponent {

  private captchaElement?: RecaptchaComponent;

  captchaType = CaptchaType;
  selectedType = CaptchaType.V2;
  isVerified = false;

  typeSelected(changed: MatRadioChange) {
    this.selectedType = changed.value;
  }

  captchaClicked(element?: RecaptchaComponent) {
    this.captchaElement = element;
    this.isVerified = true;
  }

  resetCaptcha() {
    this.isVerified = false;
  }

  send() {
    this.captchaElement?.reset();
  }
}
