import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { GenericTableShellComponent } from "@local/angular-material/feature/generic-table"
import { TableComponent } from "@local/angular-material/feature/table";
import { SliderComponent } from "@local/angular-material/feature/slider";
import { FilterShellComponent } from "./filter-shell/filter-shell.component";
import { DialogShellComponent } from "./dialog-shell/dialog-shell.component";
import { DataGridShellComponent } from "./data-grid-shell/data-grid-shell.component";

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
      },
      {
        path: 'filter',
        component: FilterShellComponent
      },
      {
        path: 'data-grid',
        component: DataGridShellComponent
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
