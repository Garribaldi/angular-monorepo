import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { captchaFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module, } from 'ng-recaptcha';
import { Captchav2Component } from './captchav2/captchav2.component';
import { Captchav3Component } from './captchav3/captchav3.component';
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { EnvironmentsService } from "@local/shared/feature/environments";
import { SharedUtilsModule } from "@local/shared/utils";

const captchaKeySetup = (environmentService: EnvironmentsService) => environmentService.googleCaptcha.captchaV3Key;

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(captchaFeatureShellRoutes),
        RouterModule.forChild(captchaFeatureShellRoutes),
        RecaptchaV3Module,
        RecaptchaModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        SharedUtilsModule,
    ],
  declarations: [OverviewComponent, Captchav2Component, Captchav3Component],
  exports: [OverviewComponent, Captchav2Component, Captchav3Component],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useFactory: captchaKeySetup,
      deps: [EnvironmentsService]
    },
  ],
})
export class CaptchaFeatureShellModule {}
