import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { TableComponent } from "@local/angular-material/feature/table";

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
