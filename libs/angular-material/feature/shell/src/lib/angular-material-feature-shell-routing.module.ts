import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { TableComponent } from "@local/angular-material/feature/table";
import { SliderComponent } from "@local/angular-material/feature/slider";

const routes: Route[] = [
  {
    path: '',
    component: OverviewComponent,
    pathMatch: "prefix",
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'table'
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'slider',
        component: SliderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularMaterialFeatureShellRoutingModule {
}
