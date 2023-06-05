import { Route } from '@angular/router';
import { DemoGoogleCaptchaComponent } from "./demo-google-captcha.component";

export const routes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoGoogleCaptchaComponent}
];
