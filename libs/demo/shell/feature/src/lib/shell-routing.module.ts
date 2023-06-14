import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

export const appRoutes: Route[] = [
  {
    path: 'table',
    title: 'Generic Table',
    loadChildren: () =>
      import('@local/demo/generic-table/feature').then(
        (m) => m.DemoGenericTableModule
      )
  },
  {
    path: 'form',
    title: 'Reactive Form',
    loadChildren: () =>
      import('@local/demo/reactive-forms/feature').then(
        (m) => m.DemoReactiveFormsModule
      )
  },
  {
    path: 'formly',
    title: 'Formly',
    loadChildren: () =>
      import('@local/demo/formly/feature').then(
        (m) => m.DemoFormlyModule
      )
  },
  {
    path: 'charts',
    title: 'Charts',
    loadChildren: () =>
      import('@local/demo/charts/feature').then(
        (m) => m.DemoChartsModule
      )
  },
  {
    path: 'captcha',
    title: 'Captcha',
    loadChildren: () =>
      import('@local/demo/google-captcha/feature').then(
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
      import('@local/demo/file-upload/feature').then(
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
export class ShellRoutingModule {
}
