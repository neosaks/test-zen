import { Injectable } from '@angular/core';
import { IShellState } from './shell-state.interface';

/**
 * Returns an object containing a list of `needleProps`
 * properties with values from the `source` object.
 */
function fetch<S extends Record<string, any>>(
  source: S,
  needleProps: Partial<S>
): Partial<S> {
  const result: Partial<S> = {};

  Object.keys(needleProps).forEach((property: keyof S) => {
    if (property in source) {
      result[property] = source[property];
    }
  });

  return result;
}

/**
 * The service stores the state of the shell.
 */
@Injectable({
  providedIn: 'root',
})
export class ShellStateService implements IShellState {
  /**
   * The name of the application is displayed on the toolbar.
   * The space character is the default value. This is necessary for
   * the state mechanism to work properly using the state property.
   */
  appName = ' ';

  /**
   * Changes the shell state properties. Returns all or only the
   * changed properties of the previous state.
   */
  changeState(
    newState: Partial<IShellState> = {},
    returnOnlyChangedValues = true
  ): Partial<IShellState> {
    return returnOnlyChangedValues
      ? fetch({ ...this }, Object.assign(this, newState))
      : { ...this };
  }
}
