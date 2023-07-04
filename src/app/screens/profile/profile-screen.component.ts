import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge, takeUntil } from 'rxjs';
import { BaseScreenComponent } from '@shared/components/base-screen/base-screen.component';
import { REGEXP_URL } from '@shared/constants/regexp-url.const';
import { IdentityService } from '@services/identity/identity.service';
import { UserService } from '@http/services/auth/user.service';
import { CheckNameValidator } from './async-validators/check-name.validator';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент страницы "Профиль" */
export class ProfileScreenComponent extends BaseScreenComponent implements OnInit {
  /** Заголовок */
  protected readonly title = 'Profile';

  protected readonly formGroup = this._fb.nonNullable.group({
    lastName: ['', [Validators.required, Validators.maxLength(255)], [this._checkNameValidator.validate.bind(this._checkNameValidator)]],
    firstName: ['', [Validators.required, Validators.maxLength(255)], [this._checkNameValidator.validate.bind(this._checkNameValidator)]],
    phoneNumber: [0, [Validators.required, Validators.minLength(10)]],
    websiteUrl: ['', [Validators.pattern(REGEXP_URL)]],
  });

  protected userEmail?: string;

  constructor(
    private _fb: FormBuilder,
    private _location: Location,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _identityService: IdentityService,
    private _checkNameValidator: CheckNameValidator
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    merge(this.formGroup.valueChanges, this._checkNameValidator.finally$)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this._cdr.detectChanges());

    this._identityService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe((user) => {
        if (user) {
          this.formGroup.patchValue(user);
          this.userEmail = user.email;
        }
      });
  }

  goToBack(): void {
    this._location.back();
  }

  save(): void {
    this._userService
      .pathUser(this.formGroup.value)
      .subscribe((response) => {
        const message = response.ok ? 'Successfully saved'
                                    : response.errorMessage;

        this._snackBar.open(message, 'OK', {
          verticalPosition: 'top',
          duration: 30000,
        });
      });
  }
}
