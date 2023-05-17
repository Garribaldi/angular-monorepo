import { Component, EventEmitter, Output } from '@angular/core';
import { ReCaptchaV3Service } from "ng-recaptcha";
import { take } from "rxjs";

@Component({
  selector: 'local-captcha-captchav3',
  templateUrl: './captchav3.component.html',
  styleUrls: ['./captchav3.component.scss'],
})
export class Captchav3Component {

  @Output() captchaResponse = new EventEmitter<string>();

  constructor(
    private readonly recaptchaService: ReCaptchaV3Service
  ) {
  }

  executeAction() {
    this.recaptchaService
      .execute('action')
      .pipe(take(1))
      .subscribe(token => this.captchaResponse.emit(token));
  }
}
