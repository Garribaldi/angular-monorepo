import { Component } from '@angular/core';
import { CaptchaType } from "../capture-type.model";
import { MatRadioChange } from "@angular/material/radio";
import { RecaptchaComponent } from "ng-recaptcha";

@Component({
  selector: 'local-captcha-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

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
