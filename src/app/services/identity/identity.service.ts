import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';

import { AuthService } from '@http/services/auth/auth.service';
import { IUser } from '@http/interfaces/user.interface';
import { IPasswordGrantRequest } from '@http/interfaces/password-grant-request.interface';
import { TokenService } from '@http/services/auth/token.service';
import { ConfigService } from '@config/config.service';

import { CLIENT_ID } from '@shared/constants/client-id.const';
import { CLIENT_SECRET } from '@shared/constants/client-secret.const';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  get user(): IUser | undefined {
    return this._user;
  }

  get user$(): Observable<IUser | undefined> {
    return this._user$.asObservable();
  }

  get login$(): Observable<void> {
    return this._login$.asObservable();
  }

  get logout$(): Observable<void> {
    return this._logout$.asObservable();
  }

  private _user?: IUser;
  private _user$ = new ReplaySubject<IUser | undefined>(1);

  private _login$ = new Subject<void>();
  private _logout$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _config: ConfigService,
    private _token: TokenService,
  ) {}

  setUser(user: IUser): void {
    this._user = user;
    this._user$.next(user);
  }

  login(username: string, password: string, command?: string): Observable<IUser> {
    if (this.isLoggedIn()) {
      this.logout();
    }

    const request: IPasswordGrantRequest = {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username,
      password,
    };

    return this._token.getAccessToken(request)
      .pipe(switchMap((accessToken) => {
        const config = this._config.getConfig();
        const accessTokenStorageKey = config.accessTokenStorageKey;

        localStorage.setItem(accessTokenStorageKey, accessToken.access_token);

        this._login$.next();

        return this._auth.myIdentity()
          .pipe(tap((user) => {
            this._user = user;
            this._user$.next(user);

            const requestedPageStorageKey = config.requestedPageStorageKey;
            const requestedPage = localStorage.getItem(requestedPageStorageKey);

            // if (requestedPage) {
            //   localStorage.removeItem(requestedPageStorageKey);
            //   this._router.navigate([requestedPage]);
            // } else if (command) {
            //   this._router.navigate([command]);
            // }

            if (command) {
              this._router.navigate([command]);
            }
          }));
      }));
  }

  logout(): void {
    const config = this._config.getConfig();
    const accessTokenStorageKey = config.accessTokenStorageKey;

    localStorage.removeItem(accessTokenStorageKey);

    this._user = undefined;
    this._user$.next(undefined);
    this._logout$.next();

    // перенаправляем на страницу авторизации
    const loginPageUrl = config.loginPageUrl;
    this._router.navigate([loginPageUrl]);
  }

  isLoggedIn(): boolean {
    const config = this._config.getConfig();
    const accessTokenStorageKey = config.accessTokenStorageKey;

    return !!this._user || !!localStorage.getItem(accessTokenStorageKey);
  }
}
