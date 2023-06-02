import { Route } from '@angular/router';
import { FileUploadComponent } from "./file-upload.component";

export const routes: Route[] = [
  {path: '', pathMatch: 'full', component: FileUploadComponent}
];
