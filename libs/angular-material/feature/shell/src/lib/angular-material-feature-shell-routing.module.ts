import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OverviewComponent } from "./overview/overview.component";
import { TableComponent } from "@local/angular-material/feature/table";
import { FilterShellComponent } from "./filter-shell/filter-shell.component";
import { DialogShellComponent } from "./dialog-shell/dialog-shell.component";
import { DataGridShellComponent } from "./data-grid-shell/data-grid-shell.component";
import { SliderShellComponent } from "./slider-shell/slider-shell.component";
import { GenericTableShellComponent } from "./generic-table-shell/generic-table-shell.component";


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
        title: 'Table',
        component: TableComponent
      },
      {
        path: 'generic-table',
        title: 'Generic Table',
        component: GenericTableShellComponent
      },
      {
        path: 'slider',
        title: 'Slider',
        component: SliderShellComponent
      },
      {
        path: 'dialog',
        title: 'Dialog',
        component: DialogShellComponent
      },
      {
        path: 'filter',
        title: 'Filter',
        component: FilterShellComponent
      },
      {
        path: 'data-grid',
        title: 'Data Grid',
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
