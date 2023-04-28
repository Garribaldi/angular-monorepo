import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { GenericTableShellComponent } from "@local/angular-material/feature/generic-table"
import { TableComponent } from "@local/angular-material/feature/table";
import { SliderComponent } from "@local/angular-material/feature/slider";
import { DialogShellComponent } from "@local/angular-material/feature/dialog";

const routes: Route[] = [
  {
    path: '',
    component: OverviewComponent,
    pathMatch: "prefix",
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'generic-table'
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'generic-table',
        component: GenericTableShellComponent
      },
      {
        path: 'slider',
        component: SliderComponent
      },
      {
        path: 'dialog',
        component: DialogShellComponent
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
