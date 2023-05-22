import { Component } from '@angular/core';
import { CaptchaType } from "../../../../../models/capture-type";
import { MatRadioChange } from "@angular/material/radio";
import { delay, Subject, tap } from "rxjs";
import { RecaptchaComponent } from "ng-recaptcha";

@Component({
  selector: 'local-captcha-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  captchaType = CaptchaType;
  selectedType = CaptchaType.V2;
  isVerified = false;

  private readonly tokenResponse = new Subject<RecaptchaComponent>();

  constructor() {
    this.tokenResponse.asObservable()
      .pipe(
        tap(() => this.isVerified = true),
        delay(5000)
      )
      .subscribe((element) => {
        element.reset();
      });
  }

  typeSelected(changed: MatRadioChange) {
    this.selectedType = changed.value;
  }

  captchaClicked() {
    this.isVerified = true;
  }

  resetCaptcha() {
    this.isVerified = false;
  }

  validResponse(element: RecaptchaComponent) {
    this.tokenResponse.next(element);
  }
}
