import { Route } from '@angular/router';
import { OverviewComponent } from "./overview/overview.component";

export const reactiveFormsFeatureShellRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: OverviewComponent}
];
