export enum UploadState {
  Start,
  Finished,
  Uploaded
}

export type FileUploadCounter = {
  pending: number;
  success: number;
  failed: number;
};

export type FileMetadata = {
  id: string,
  filename: string,
  mimeType: string,
  status: 'CREATED' | 'UPLOADED' | 'PREPARED' | 'SENDING'
  uploadDate: Date
}

export type CreatedFile = {
  file: File,
  fileMetadata: FileMetadata
};
