import { Injectable, OnDestroy } from '@angular/core';
import { finalize, mergeMap, ReplaySubject, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { FileService } from './file.service';
import { CreatedFile } from '../models/created-file.model';
import { FileUploadCounter } from '../models/file-upload-counter.model';
import { UploadState } from '../models/upload-state.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements OnDestroy {

  private readonly maxParallelUpload = 3;
  private readonly uploadLimit = 10;

  private readonly fileUpload = new Subject<CreatedFile>();
  private readonly filesUpload$ = this.fileUpload.asObservable();
  private readonly pendingUploads = new Map<string, ReplaySubject<void>>();

  private readonly fileUploadCounter = new Subject<FileUploadCounter>();
  private readonly filesUploadCounter$ = this.fileUploadCounter.asObservable();

  private readonly unsubscribe = new Subject<void>();

  private uploadState: UploadState = 'Finished';
  private fileUploadSubscription: Subscription | null = null;

  private counter: FileUploadCounter = {pending: 0, success: 0, failed: 0};

  constructor(
    private readonly fileService: FileService
  ) {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  uploadFiles<T extends FileList | File[]>(files: T) {
    const fileList: File[] = Array.isArray(files) ? files : Array.from(files);

    if (!fileList.length) {
      // ToDo: Show notification
      return;
    }

    if (fileList.length > this.uploadLimit) {
      // ToDo: Show notification
      return;
    }

    if (!this.fileUploadSubscription) {
      this.initUpload();
      this.uploadState = 'Start';
    }
  }

  private initUpload() {
    this.fileUploadSubscription = this.filesUpload$
      .pipe(
        mergeMap(createdFile => {
          const fileId = createdFile.fileMetadata.id;

          let cancelCurrentUpload = this.pendingUploads.get(fileId);
          if (!cancelCurrentUpload) {
            cancelCurrentUpload = new ReplaySubject<void>();
            this.pendingUploads.set(fileId, cancelCurrentUpload);
          }

          return this.fileService.uploadFile$(createdFile)
            .pipe(
              takeUntil(cancelCurrentUpload),
              tap(() => this.uploadState = 'Uploaded')
            );
        }, this.maxParallelUpload),
        finalize(() => {
          this.uploadState = 'Finished';

          const {success} = this.counter;
          if (success > 0) {
            // Todo: Show success notification
          }

          this.updateCounter();
          this.pendingUploads.clear();

        })
      )
      .subscribe();
  }

  /**
   * @private
   * Update internal file upload counter with new values
   *
   * Without new values, counter is reset to default
   *
   * @param props updated properties
   */
  private updateCounter(props?: Partial<FileUploadCounter>) {
    if (props) {
      this.counter = {...this.counter, ...props};
    } else {
      this.counter = {pending: 0, success: 0, failed: 0};
    }

    this.fileUploadCounter.next(this.counter);
  }
}
