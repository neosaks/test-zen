import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RequestsService } from '@services/requests/requests.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  private readonly _data = {
    pendingRequests: 0,
  };

  constructor(private _requests: RequestsService) {}

  /** Intercept */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requests = this._requests;
    const data = this._data;

    // update data
    data.pendingRequests++;

    // set data
    this._requests._setData(data);

    return next.handle(request)
      .pipe(finalize(() => {
        // update data
        data.pendingRequests--;

        // set data
        this._requests._setData(data);
      }));
  }
}
