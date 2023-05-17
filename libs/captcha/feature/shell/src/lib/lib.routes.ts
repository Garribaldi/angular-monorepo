import { Route } from '@angular/router';
import { OverviewComponent } from "./overview/overview.component";

export const captchaFeatureShellRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: OverviewComponent}
];
