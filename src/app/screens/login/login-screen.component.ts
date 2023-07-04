import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { IUser } from '@http/interfaces/user.interface';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';
import { IdentityService } from '@services/identity/identity.service';
import { RequestsService } from '@services/requests/requests.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент страницы авторизации */
export class LoginScreenComponent extends BaseScreenComponent {
  /** Форма авторизации */
  protected readonly loginFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  /** Заголовок страницы */
  protected readonly title = 'Авторизация';

  protected get user$(): Observable<IUser | undefined> {
    return this._identity.user$;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _identity: IdentityService,
    private _requests: RequestsService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._requests.stateChanged$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this._cdr.detectChanges());
  }

  /** Перенаправляет на главную страницу */
  protected index(): void {
    this._router.navigate(['index']);
  }

  /** Отправляет запрос на авторизацию */
  protected login(): void {
    const username = this.loginFormGroup.value.username;
    const password = this.loginFormGroup.value.password;

    if (username && password) {
      this._identity.login(username, password)
        .pipe(catchError((error) => {
          this._snackBar.open(error.statusText);
          return throwError(() => error);
        }))
        .subscribe();
    }
  }

  protected isLoading(): boolean {
    return this._requests.isLoading();
  }

  /** Удаляет данные авторизации */
  protected logout(): void {
    return this._identity.logout();
  }

  /** Возвращает `true` если пользователь авторизован, иначе `false` */
  protected isLoggedIn(): boolean {
    return this._identity.isLoggedIn();
  }
}
