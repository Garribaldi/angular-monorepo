export type FileMetadata = {
  id: string,
  filename: string,
  mimeType: string,
  status: 'CREATED' | 'UPLOADED' | 'PREPARED' | 'SENDING'
  uploadDate: Date
}
