import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";

const fileUploadFeatureShellRoutes: Route[] = [
  {
    path: '', pathMatch: 'full', component: OverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(fileUploadFeatureShellRoutes)
  ],
  exports: [RouterModule],
})
export class FileUploadFeatureShellRoutingModule {
}
