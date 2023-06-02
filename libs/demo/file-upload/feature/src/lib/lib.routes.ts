import { Route } from '@angular/router';
import { FileUploadComponent } from "./file-upload.component";

export const demoFileUploadFeatureRoutes: Route[] = [
  {path: '', pathMatch: 'full', component: FileUploadComponent}
];
