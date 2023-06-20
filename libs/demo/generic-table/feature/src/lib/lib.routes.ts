import { Route } from '@angular/router';
import { DemoGenericTableComponent } from "./demo-generic-table.component";

export const demoGenericTableFeatureRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoGenericTableComponent}
];
