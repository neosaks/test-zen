import { Component, ChangeDetectionStrategy, Injector, OnInit, ViewChild, Type, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { ShellService } from '@services/shell/shell.service';
import { IdentityService } from '@services/identity/identity.service';
import { AuthService } from '@http/services/auth/auth.service';
import { IUser } from '@http/interfaces/user.interface';
import { RequestsService } from '@services/requests/requests.service';
import { ConfigService } from '@config/config.service';

@Component({
  selector: 'app-screen-root',
  templateUrl: './screen-root.component.html',
  styleUrls: ['./screen-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Корневой компонент экранов */
export class ScreenRootComponent implements OnInit {
  readonly title = 'ScreenRootComponent';

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  protected _componentTypeExpression!: Type<unknown>;
  protected _componentInjector!: Injector;

  get user(): IUser | undefined {
    return this._identity.user;
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _title: Title,
    private _shell: ShellService,
    private _identity: IdentityService,
    private _auth: AuthService,
    private _config: ConfigService,
    private _requests: RequestsService,
  ) {}

  ngOnInit(): void {
    // Updating the page title if the shell state is changed
    // this._shell.stateChanged$.subscribe(() => {
    //   this._title.setTitle(this._shell.state.appName);
    // });

    this._requests.stateChanged$.subscribe(() => {
      this._cdr.detectChanges();
    });

    if (this._isLoggedIn()) {
      // загружаем данные о пользователе
      this._auth.myIdentity().subscribe((user) => {
        this._identity.setUser(user);
      });
    } else {
      const config = this._config.getConfig();

      // запоминаем запрашиваемую страницу
      const requestedPageStorageKey = config.requestedPageStorageKey;
      localStorage.setItem(requestedPageStorageKey, location.href);

      // перенаправляем на страницу авторизации
      const loginPageUrl = config.loginPageUrl;
      this._router.navigate([loginPageUrl]);
    }
  }

  protected _isLoading(): boolean {
    return this._requests.isLoading();
  }

  /** Выход пользователя из системы */
  protected _logout(): void {
    this._identity.logout();
  }

  /** Возвращает `true` если пользователь авторизован, иначе `false` */
  protected _isLoggedIn(): boolean {
    return this._identity.isLoggedIn();
  }
}
