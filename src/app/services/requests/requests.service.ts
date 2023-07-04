import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  get stateChanged$(): Observable<void> {
    return this._stateChanged$.asObservable();
  }

  get pendingRequests(): number {
    return this._pendingRequests;
  }

  private _stateChanged$ = new Subject<void>();
  private _pendingRequests = 0;

  isLoading(): boolean {
    return !!this._pendingRequests;
  }

  /** @private-api */
  _setData({
    pendingRequests = 0,
  }): void {
    this._pendingRequests = pendingRequests;

    this._stateChanged$.next();
  }
}