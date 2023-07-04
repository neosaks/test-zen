import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { finalize, first, fromEvent, mergeMap, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploaderService {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  selectFile<T>(
    uploadFn: (data: FormData) => Observable<T>,
    fileInputName: string = 'file'
  ): Observable<T> {
    let fileInput: HTMLInputElement | null = this._document.createElement('input');
    fileInput.type = 'file';

    const fileUploader$ = fromEvent(fileInput, 'change')
      .pipe(
        first(),
        mergeMap((event) => {
          if (event.target instanceof HTMLInputElement) {
            const selectedFile = event.target.files?.item(0);
            if (selectedFile instanceof File) {
              const uploadData = new FormData();
              uploadData.append(fileInputName, selectedFile, selectedFile.name);
              return uploadFn(uploadData);
            }
          }

          return throwError(() => new Error('File upload error'));
        }),
        finalize(() => fileInput = null),
      );

    fileInput.click();

    return fileUploader$;
  }
}
