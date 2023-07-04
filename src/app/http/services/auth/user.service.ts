import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { IUser } from '@http/interfaces/user.interface';
import { PatchUserResponse } from '@http/interfaces/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  pathUser(user: Partial<IUser>): Observable<PatchUserResponse> {
    return of({
      ok: true,
    });
  }

  validateName(name: string): Observable<boolean> {
    return of(null).pipe(map(() => {
      if (name.length < 2) {
        return false;
      }

      return true;
    }), delay(2000));
  }
}