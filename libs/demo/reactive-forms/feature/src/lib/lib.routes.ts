import { Route } from '@angular/router';
import { DemoReactiveFormsComponent } from "./demo-reactive-forms.component";

export const demoReactiveFormsFeatureRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoReactiveFormsComponent}
];
