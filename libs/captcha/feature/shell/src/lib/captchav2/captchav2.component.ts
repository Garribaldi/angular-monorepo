import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EnvironmentsService } from "@local/shared/feature/environments";
import { RecaptchaComponent } from "ng-recaptcha";

@Component({
  selector: 'local-captcha-captchav2',
  templateUrl: './captchav2.component.html',
  styleUrls: ['./captchav2.component.scss'],
})
export class Captchav2Component {

  @ViewChild('captchaElement', {static: true}) captchaElement!: RecaptchaComponent;

  siteKey: string;

  @Output() captchaClicked = new EventEmitter<void>();
  @Output() timedOut = new EventEmitter<void>();
  @Output() hasError = new EventEmitter<[]>();

  constructor(
    private readonly environmentService: EnvironmentsService
  ) {
    this.siteKey = this.environmentService.captchaV2Key;
  }

  resolved(response: string | null) {
    if (response) {
      this.captchaClicked.emit();
    } else {
      this.timedOut.emit();
    }
  }

  errored(error: []) {
    this.hasError.emit(error);
  }
}
