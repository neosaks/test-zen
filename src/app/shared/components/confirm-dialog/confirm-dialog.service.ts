import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExcursion } from '@http/interfaces/excursion.interface';

@Injectable()
export class ExcursionFormService {
  get created$(): Observable<IExcursion> {
    return this._created.asObservable();
  }

  get updated$(): Observable<IExcursion> {
    return this._updated.asObservable();
  }

  private _created = new Subject<IExcursion>();
  private _updated = new Subject<IExcursion>();

  /** @private-api */
  created(excursion: IExcursion): void {
    return this._created.next(excursion);
  }

  /** @private-api */
  updated(excursion: IExcursion): void {
    return this._updated.next(excursion);
  }
}
