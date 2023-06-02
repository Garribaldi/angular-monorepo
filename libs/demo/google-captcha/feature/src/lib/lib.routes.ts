import { Route } from '@angular/router';
import { GoogleCaptchaComponent } from "./google-captcha.component";

export const routes: Route[] = [
  {path: '', pathMatch: 'full', component: GoogleCaptchaComponent}
];
