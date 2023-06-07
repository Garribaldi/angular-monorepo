import { Injectable } from '@angular/core';
import { CreatedFile, FileMetadata } from "./file-upload.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  uploadFile(file: CreatedFile): Observable<FileMetadata> {

    return of(file.fileMetadata);
  }
}
