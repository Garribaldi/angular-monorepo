import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreatedFile } from '../models/created-file.model';
import { FileMetadata } from '../models/file-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  uploadFile$(file: CreatedFile): Observable<FileMetadata> {
    return of(file.fileMetadata);
  }
}
