import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

export const appRoutes: Route[] = [
  {
    path: 'table',
    title: 'Generic Table',
    loadChildren: () =>
      import('libs/demo/generic-table/feature/src').then(
        (m) => m.DemoGenericTableModule
      )
  },
  {
    path: 'form',
    title: 'Reactive Form',
    loadChildren: () =>
      import('libs/reactive-forms/feature/shell/src').then(
        (m) => m.ReactiveFormsFeatureShellModule
      )
  },
  {
    path: 'charts',
    title: 'Charts',
    loadChildren: () =>
      import('libs/demo/charts/feature/src').then(
        (m) => m.DemoChartsModule
      )
  },
  {
    path: 'captcha',
    title: 'Captcha',
    loadChildren: () =>
      import('libs/demo/google-captcha/feature/src').then(
        (m) => m.DemoGoogleCaptchaModule
      )
  },
  {
    path: 'material',
    title: 'Angular Material',
    loadChildren: () =>
      import('@local/demo/angular-material/feature').then(
        (m) => m.DemoAngularMaterialModule
      )
  },
  {
    path: 'upload',
    title: 'File Upload',
    loadChildren: () =>
      import('libs/demo/file-upload/feature/src').then(
        (m) => m.DemoFileUploadModule
      )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ShellFeatureRoutingModule {
}
