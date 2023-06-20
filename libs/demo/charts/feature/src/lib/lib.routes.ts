import { Route } from '@angular/router';
import { DemoChartsComponent } from "./demo-charts.component";

export const demoChartsFeatureRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoChartsComponent}
];
