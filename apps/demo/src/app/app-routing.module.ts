import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

export const appRoutes: Route[] = [
  {
    path: 'table',
    loadChildren: () => import('@local/generic-table/feature/shell').then(m => m.GenericTableFeatureShellModule)
  },
  {
    path: 'material',
    loadChildren: () => import('@local/angular-material/feature/shell').then(m => m.AngularMaterialFeatureShellModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {initialNavigation: "enabledBlocking"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
