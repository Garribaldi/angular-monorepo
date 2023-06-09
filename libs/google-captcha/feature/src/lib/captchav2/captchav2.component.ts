import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EnvironmentsService } from "@local/shared/feature/environments";
import { RecaptchaComponent } from "ng-recaptcha";
import { take } from "rxjs";
import { EvaluateGoogleCaptchaService } from "@local/google-captcha/data-access";

@Component({
  selector: 'local-google-captcha-captchav2',
  templateUrl: './captchav2.component.html',
  styleUrls: ['./captchav2.component.scss'],
})
export class Captchav2Component {

  private _captchaElement?: RecaptchaComponent;
  @ViewChild('captchaElement') set captchaElement(captchaElement: RecaptchaComponent | undefined) {
    this._captchaElement = captchaElement;
  }

  get captchaElement(): RecaptchaComponent | undefined {
    return this._captchaElement;
  }

  siteKey: string;

  @Output() captchaClicked = new EventEmitter<RecaptchaComponent>();
  @Output() timedOut = new EventEmitter<void>();
  @Output() hasError = new EventEmitter<[]>();

  constructor(
    private readonly environmentService: EnvironmentsService,
    private readonly googleValidateService: EvaluateGoogleCaptchaService
  ) {
    const {captchaV2Key} = this.environmentService.googleCaptcha;
    this.siteKey = captchaV2Key;
  }

  resolved(response: string | null) {

    if (!response) {
      this.timedOut.emit();
      return;
    }

    this.googleValidateService.validateResponse$(response, this.siteKey)
      .pipe(take(1))
      .subscribe({
        next: () => this.captchaClicked.emit(this.captchaElement),
        error: () => this.hasError.emit([])
      });
  }

  errored(error: []) {
    this.hasError.emit(error);
  }
}
