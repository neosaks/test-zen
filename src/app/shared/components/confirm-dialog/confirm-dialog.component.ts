import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

export const enum ConfirmDialogType {
  Default = 0,
}

export interface IConfirmDialogConfig {
  title?: string;
  message: string;
  confirm?: () => void;
  reject?: () => void;
  type?: ConfirmDialogType;
}

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** Компонент диалога подтверждения */
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  get title(): string {
    return this._data?.title || 'Подтвердите действие';
  }

  get message(): string {
    return this._data?.message || 'Вы уверены что хотите продолжить?';
  }

  get confirm(): (() => void) {
    return this._data?.confirm || (() => this._matDialogRef.close(true));
  }

  get reject(): () => void {
    return this._data?.reject || (() => this._matDialogRef.close(false));
  }

  get type(): ConfirmDialogType {
    return this._data?.type || ConfirmDialogType.Default;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected _data: IConfirmDialogConfig,
    private _matSnackBar: MatSnackBar,
    private _matDialogRef: MatDialogRef<unknown, boolean>,
  ) {}

  ngOnInit(): void {
    if (!this._data) {
      const message = 'Диалоговое окно будет закрыто через 3 секунды. Подробнее в консоли браузера.';
      this._matSnackBar.open(message, 'ОК', { duration: 3000 });
      setTimeout(() => this.reject(), 3000);
      throw new Error('Missing component configuration');
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
