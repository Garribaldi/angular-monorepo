import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { demoFileUploadFeatureRoutes } from './lib.routes';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadModule } from "@local/file-upload/feature";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(demoFileUploadFeatureRoutes), FileUploadModule],
  declarations: [FileUploadComponent]
})
export class DemoFileUploadModule {}
