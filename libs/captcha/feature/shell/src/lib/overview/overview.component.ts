import { Component } from '@angular/core';
import { CaptchaType } from "../models/capture-type";
import { MatRadioChange } from "@angular/material/radio";

@Component({
  selector: 'local-captcha-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  captchaType = CaptchaType;
  selectedType = CaptchaType.V2;
  isVerified = false;

  typeSelected(changed: MatRadioChange) {
    this.selectedType = changed.value;
  }

  captchaClicked() {
    this.isVerified = true;
  }

  resetCaptcha() {
    this.isVerified = false;
  }
}
