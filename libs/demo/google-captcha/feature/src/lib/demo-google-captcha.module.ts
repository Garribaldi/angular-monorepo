import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoGoogleCaptchaComponent } from './demo-google-captcha.component';
import { RouterModule } from "@angular/router";
import { routes } from "./lib.routes";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { GoogleCaptchaModule } from "@local/google-captcha/feature";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleCaptchaModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
  ],
  declarations: [DemoGoogleCaptchaComponent],
})
export class DemoGoogleCaptchaModule {}
