import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Captchav3Component } from "./captchav3/captchav3.component";
import { Captchav2Component } from "./captchav2/captchav2.component";
import { RecaptchaModule } from "ng-recaptcha";
import { MatButtonModule } from "@angular/material/button";
import { SharedUtilsModule } from "@local/shared/utils";

@NgModule({
  imports: [
    CommonModule,
    RecaptchaModule,
    MatButtonModule,
    SharedUtilsModule
  ],
  declarations: [
    Captchav2Component,
    Captchav3Component
  ],
  exports: [
    Captchav2Component,
    Captchav3Component
  ]
})
export class GoogleCaptchaModule {}
