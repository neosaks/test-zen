import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Optional,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { IHttpFieldErrors } from '@http/interfaces/http-field-errors.interface';
import { IHttpOptions } from '@http/interfaces/http-options.interface';
import { BaseRegistry } from '@http/http-registry.class';
import { FormService } from './form.service';

/** Базовый класс компонента формы */
@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseFormComponent<T> implements OnInit, OnDestroy {
  abstract readonly formGroup: FormGroup;
  abstract readonly registry: BaseRegistry<T>;

  @Output()
  readonly created = new EventEmitter<T>();

  @Output()
  readonly updated = new EventEmitter<T>();

  @Optional()
  protected readonly _formService? = inject(FormService<T>, { optional: true });

  /** `ChangeDetectionRef` */
  protected readonly _cdr = inject(ChangeDetectorRef);

  /** Событие возникает перед деструктуризацией компонента */
  protected readonly _destroy$ = new Subject<void>();

  protected abstract _model?: T | undefined;

  constructor() {}

  create(model: T): Observable<T>;
  create(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  create(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>> {
    return this.registry.createEntry(model, options!);
  }

  update(model: T): Observable<T>;
  update(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  update(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>> {
    return this.registry.updateEntry(model, options!)
  }

  /** @inheritdoc */
  ngOnInit(): void {
    if (this._model) {
      this.formGroup.patchValue(this._model);
    }

    this.formGroup.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._cdr.detectChanges();
      });
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected _create(): void {
    const model = Object.assign({}, this._model || {}, this.formGroup.value);

    this._beforeCreate(model);

    if (!this._isModel(model)) {
      throw new Error('Internal client error. Please contact support.');
    }

    this.create(model, { observe: 'response' })
      .pipe(map(((response) => {
        if (response.status === 422) {
          this._showFieldErrors(<IHttpFieldErrors>response.body)
        }

        return <T>response.body;
      })))
      .subscribe((model) => {
        this._afterCreate(model);

        this.created.emit(model);
        this._formService?.created(model);
      });
  }

  protected _update(): void {
    const model = Object.assign({}, this._model || {}, this.formGroup.value);

    this._beforeUpdate(model);

    if (!this._isModel(model)) {
      throw new Error('Internal client error. Please contact support.');
    }

    this.update(model, { observe: 'response' })
      .pipe(map(((response) => {
        if (response.status === 422) {
          this._showFieldErrors(<IHttpFieldErrors>response.body)
        }

        return <T>response.body;
      })))
      .subscribe((model) => {
        this._afterUpdate(model);

        this.updated.emit(model);
        this._formService?.updated(model);
      });
  }

  protected _beforeCreate(formGroupValue: T): void {
    this._checkMomentValues(formGroupValue);
  }

  protected _afterCreate(model: T): void {}

  protected _beforeUpdate(formGroupValue: T): void {
    this._checkMomentValues(formGroupValue);
  }

  protected _afterUpdate(model: T): void {}

  protected _checkMomentValues(formGroupValue: T): void {
    Object.entries(formGroupValue!).forEach(([key, value]) => {
      if (moment.isMoment(value)) {
        Object.assign(formGroupValue!, {
          [key]:  value.format('YYYY-MM-DD HH:mm:ss'),
        });
      }
    });
  }

  protected _showFieldErrors(errors: IHttpFieldErrors): void {
    errors.forEach((fieldError) => {
      const formControl = this.formGroup.get(fieldError.field);
      if (formControl) {
        // formControl.setErrors();
      }
    });
  }

  protected _isNew(): boolean {
    return !this._model;
  }

  private _isModel(model: any): model is T {
    return true;
  }
}
