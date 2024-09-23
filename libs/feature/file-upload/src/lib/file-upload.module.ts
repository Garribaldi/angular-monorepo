import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatButton } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButton
  ],
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule {
}
