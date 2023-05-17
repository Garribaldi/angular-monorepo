import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { captchaFeatureShellRoutes } from './lib.routes';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(captchaFeatureShellRoutes),
    RouterModule.forChild(captchaFeatureShellRoutes),
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class CaptchaFeatureShellModule {}
