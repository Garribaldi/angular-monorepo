import { Route } from '@angular/router';
import { DemoFileUploadComponent } from "./demo-file-upload.component";

export const routes: Route[] = [
  {path: '', pathMatch: 'full', component: DemoFileUploadComponent}
];
