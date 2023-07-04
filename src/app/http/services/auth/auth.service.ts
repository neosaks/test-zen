import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser, UserRole } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  /** @original */
  // myIdentity(): Observable<IUser> {
  //   return this._http.get<IUser>('/user/myIdentity');
  // }

  /** @mock */
  myIdentity(): Observable<IUser> {
    return of({
      id: 1,
      email: 'demo@demo.com',
      firstName: 'Maxim',
      lastName: 'Chichkanov',
      phoneNumber: 9064704479,
      websiteUrl: '',
      role: UserRole.User,
    });
  }
}