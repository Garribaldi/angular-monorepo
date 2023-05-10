import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: 'table',
    title: 'Generic Table',
    loadChildren: () =>
      import('@local/table/feature/shell').then(
        (m) => m.TableFeatureShellModule
      )
  },
  {
    path: 'form',
    title: 'Reactive Form',
    loadChildren: () =>
      import('@local/reactive-forms/feature/shell').then(
        (m) => m.ReactiveFormsFeatureShellModule
      )
  },
  {
    path: 'charts',
    title: 'Charts',
    loadChildren: () =>
      import('@local/charts/feature/shell').then(
        (m) => m.ChartsFeatureShellModule
      )
  },
  {
    path: 'material',
    title: 'Angular Material',
    loadChildren: () =>
      import('@local/angular-material/feature/shell').then(
        (m) => m.AngularMaterialFeatureShellModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
