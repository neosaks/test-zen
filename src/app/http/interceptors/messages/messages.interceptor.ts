import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class MessagesInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  /** Intercept */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this._snackBar.open(error.message, 'OK');
        }
        return throwError(() => error);
      })
    );
  }
}
