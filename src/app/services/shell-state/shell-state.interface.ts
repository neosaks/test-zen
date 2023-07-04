export interface IShellState {
  /**
   * The name of the application is displayed on the toolbar.
   * The space character is the default value. This is necessary for
   * the state mechanism to work properly using the state property.
   */
  appName: string;
}
