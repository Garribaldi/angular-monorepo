import { Route, RouterModule } from "@angular/router";
import { DemoFormsComponent } from "./demo-forms.component";
import { DemoFormlyComponent } from "./demo-formly/demo-formly.component";
import { DemoReactiveFormsComponent } from "./demo-reactive-forms/demo-reactive-forms.component";
import { NgModule } from "@angular/core";

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: DemoFormsComponent,
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'formly'
      },
      {
        path: 'formly',
        title: 'Formly',
        component: DemoFormlyComponent
      },
      {
        path: 'reactive-forms',
        title: 'Reactive Forms',
        component: DemoReactiveFormsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoFormsRoutingModule {}
