import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FormService<T> {
  get created$(): Observable<T> {
    return this._created.asObservable();
  }

  get updated$(): Observable<T> {
    return this._updated.asObservable();
  }

  private _created = new Subject<T>();
  private _updated = new Subject<T>();

  /** @private-api */
  created(model: T): void {
    return this._created.next(model);
  }

  /** @private-api */
  updated(model: T): void {
    return this._updated.next(model);
  }
}
