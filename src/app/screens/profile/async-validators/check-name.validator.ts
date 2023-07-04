import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '@http/services/auth/user.service';
import { Observable, Subject, map, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckNameValidator implements AsyncValidator {
  get finally$(): Observable<void> {
    return this._finally$.asObservable();
  }

  private _finally$ = new Subject<void>();

  constructor(private _userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this._userService.validateName(control.value).pipe(
      map(isValid => (isValid ? null : { checkName: true })),
      finalize(() => setTimeout(() => this._finally$.next())),
    );
  }
}
