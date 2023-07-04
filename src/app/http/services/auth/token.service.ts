import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';
import { objectToFormData } from '@shared/functions/object-to-form-data.function';
import { IPasswordGrantRequest } from '../../interfaces/password-grant-request.interface';
import { IToken } from '../../interfaces/token.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private _http: HttpClient) {}

  /** @original */
  // getAccessToken(request: IPasswordGrantRequest): Observable<IToken> {
  //   return this._http.post<IToken>(
  //     '/authserver/access_token',
  //     objectToFormData(request)
  //   );
  // }

  /** @mock */
  getAccessToken(request: IPasswordGrantRequest): Observable<IToken> {
    return of(null).pipe(map(() => {
      if (!(request.username === 'admin@admin.com' && request.password === 'admin')) {
        throw new HttpErrorResponse({
          status: 401,
          statusText: 'Invalid email or password'
        });
      }

      return {
        token_type: 'Bearer',
        expires_in: 3600000,
        access_token: '@token',
        refresh_token: '@refresh',
      };
    }));
  }
}