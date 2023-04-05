import { Route, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";
import { NgModule } from "@angular/core";


const routes: Route[] = [
  {
    path: '',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericTableFeatureShellRoutingModule {
}
