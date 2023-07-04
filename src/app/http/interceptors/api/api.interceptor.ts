import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigService } from '@config/config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private _config: ConfigService) {}

  /** Intercept */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url[0] !== '/') {
      return next.handle(request);
    }

    const config = this._config.getConfig();
    const apiUrl = config.apiUrl;

    const clone = request.clone({
      url: apiUrl + request.url,
    });

    return next.handle(clone);
  }
}
