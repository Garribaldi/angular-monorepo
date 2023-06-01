import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadFeatureShellRoutingModule } from './file-upload-feature-shell-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { FileUploadFeatureUploadModule } from "@local/file-upload/feature/upload";

@NgModule({
  imports: [
    CommonModule,
    FileUploadFeatureShellRoutingModule,
    FileUploadFeatureUploadModule
  ],
  declarations: [OverviewComponent],
})
export class FileUploadFeatureShellModule {}
