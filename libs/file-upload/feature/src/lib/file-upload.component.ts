import { Component, Input } from '@angular/core';
import { CreatedFile, FileMetadata } from "./file-upload.model";
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'local-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {

  @Input() acceptTypes = 'application/pdf';

  readonly createdFiles: CreatedFile[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input?.files?.length) {
      return;
    }

    Array.from(input.files).forEach(file => {
      const fileMetadata: FileMetadata = {
        id: uuid(),
        filename: file.name,
        mimeType: file.type,
        uploadDate: new Date(),
        status: 'CREATED'
      };
      this.createdFiles.push({file, fileMetadata});
    });

    // TODO: hand files over to UploadService
    input.value = '';
  }
}
