import { Route } from "@angular/router";
import { DemoFormlyComponent } from "./demo-formly.component";

export const routes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoFormlyComponent}
];
