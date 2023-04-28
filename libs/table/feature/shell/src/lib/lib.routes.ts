import { Route } from '@angular/router';
import { OverviewComponent } from "./overview/overview.component";

export const tableFeatureShellRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: OverviewComponent}
];
