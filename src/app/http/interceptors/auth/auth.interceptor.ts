import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@config/config.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private _config: ConfigService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const config = this._config.getConfig();

    const accessTokenStorageKey = config.accessTokenStorageKey;
    const accessToken = localStorage.getItem(accessTokenStorageKey);

    if (!accessToken) {
      return next.handle(request);
    }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${accessToken}`
      ),
    });

    // Send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // удаляем данные авторизации
          const accessTokenStorageKey = config.accessTokenStorageKey;
          localStorage.removeItem(accessTokenStorageKey);
    
          // запоминаем запрашиваемую страницу
          const requestedPageStorageKey = config.requestedPageStorageKey;
          localStorage.setItem(requestedPageStorageKey, location.href);
    
          // перенаправляем на страницу авторизации
          const loginPageUrl = config.loginPageUrl;
          this._router.navigate([loginPageUrl]);
        }
        return throwError(() => error);
      })
    );
  }
}
