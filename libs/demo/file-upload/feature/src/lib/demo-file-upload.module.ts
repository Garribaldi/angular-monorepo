import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './lib.routes';
import { DemoFileUploadComponent } from './demo-file-upload.component';
import { FileUploadModule } from '@local/feature/file-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [DemoFileUploadComponent]
})
export class DemoFileUploadModule {}
