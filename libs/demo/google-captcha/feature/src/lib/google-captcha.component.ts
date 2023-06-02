import { Component } from '@angular/core';
import { RecaptchaComponent } from "ng-recaptcha";
import { MatRadioChange } from "@angular/material/radio";
import { CaptchaType } from "@local/google-captcha/data-access";

@Component({
  selector: 'local-demo-google-captcha',
  templateUrl: './google-captcha.component.html',
  styleUrls: ['./google-captcha.component.scss'],
})
export class GoogleCaptchaComponent {

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
