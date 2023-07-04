import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IShellState } from '@services/shell-state/shell-state.interface';
import { ShellService } from '@services/shell/shell.service';

/** Базовый класс компонента экрана */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseScreenComponent implements OnInit, OnDestroy {
  /** Заголовок экрана. Передается в сервис оболочки `ShellService`. */
  protected abstract title: string;

  /** `ShellService` экземпляр сервиса оболочки */
  protected readonly _shell = inject(ShellService);

  /** `ChangeDetectionRef` */
  protected readonly _cdr = inject(ChangeDetectorRef);

  /** Событие возникает перед деструктуризацией компонента */
  protected readonly _destroy$ = new Subject<void>();

  /**
   * Предыдущее состояние оболочки. Используется для возвращения оболочки
   * в исходное состоянии перед деструктуризацией компонента экрана.
   */
  private _shellState?: IShellState | Partial<IShellState>;

  /** @inheritdoc */
  ngOnInit(): void {
    this._shellState = this._updateShell();
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    if (this._shellState) {
      this._shell.changeState(this._shellState);
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  /** Обновляет состояние оболочки */
  private _updateShell(): IShellState | Partial<IShellState> {
    return this._shell.changeState({ appName: this.title });
  }
}
