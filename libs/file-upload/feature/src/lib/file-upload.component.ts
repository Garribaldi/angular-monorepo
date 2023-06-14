import { Component, Input } from '@angular/core';

@Component({
  selector: 'local-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {

  @Input() acceptTypes = 'application/pdf';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input?.files?.length) {
      return;
    }


    // TODO: hand files over to UploadService
    input.value = '';
  }
}
