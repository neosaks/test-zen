import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IShellState } from '@services/shell-state/shell-state.interface';
import { ShellStateService } from '../shell-state/shell-state.service';

/** Description */
@Injectable({
  providedIn: 'root',
})
export class ShellService {
  /** Emitted when service status changes. */
  readonly stateChanged$ = new Subject<void>();

  /** Service constructor. */
  constructor(readonly state: ShellStateService) {}

  /** Description */
  changeState(
    newState: Partial<IShellState>,
    returnOnlyChangedValues?: true
  ): Partial<IShellState>;

  /** Description */
  changeState(
    newState: Partial<IShellState>,
    returnOnlyChangedValues?: false
  ): IShellState;

  /** Description */
  changeState(
    newState: Partial<IShellState> = {},
    returnOnlyChangedValues = true
  ): IShellState | Partial<IShellState> {
    const oldState = this.state.changeState(newState || {}, returnOnlyChangedValues);

    this.stateChanged$.next();

    return oldState;
  }
}
