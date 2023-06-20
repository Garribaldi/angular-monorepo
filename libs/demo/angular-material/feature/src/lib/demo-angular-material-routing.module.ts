import { Route, RouterModule } from "@angular/router";
import { DemoAngularMaterialComponent } from "./demo-angular-material.component";
import { DemoTableComponent } from "./demo-table/demo-table.component";
import { DemoGenericTableComponent } from "./demo-generic-table/demo-generic-table.component";
import { DemoSliderComponent } from "./demo-slider/demo-slider.component";
import { DemoDialogComponent } from "./demo-dialog/demo-dialog.component";
import { DemoFilterComponent } from "./demo-filter/demo-filter.component";
import { DemoDataGridComponent } from "./demo-data-grid/demo-data-grid.component";
import { NgModule } from "@angular/core";


export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: DemoAngularMaterialComponent,
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'table'
      },
      {
        path: 'table',
        title: 'Table',
        component: DemoTableComponent
      },
      {
        path: 'generic-table',
        title: 'Generic Table',
        component: DemoGenericTableComponent
      },
      {
        path: 'slider',
        title: 'Slider',
        component: DemoSliderComponent
      },
      {
        path: 'dialog',
        title: 'Dialog',
        component: DemoDialogComponent
      },
      {
        path: 'filter',
        title: 'Filter',
        component: DemoFilterComponent
      },
      {
        path: 'data-grid',
        title: 'Data Grid',
        component: DemoDataGridComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoAngularMaterialRoutingModule {}
